import React from 'react';

import Canvas from '../../modules/canvas/Canvas';
import Math3D from './Math';
import Panel3D from './panel/Panel3D';

import Light from '../../modules/graph3D/entities/Light';
import Point from '../../modules/graph3D/entities/Point';

import './graph3D.css';

const img = require('../../images/space.jpg');

class Graph3D extends React.Component {
    constructor(props) {
        super(props);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, -50),
            DISPLAY: new Point(0, 0, -30),
            P1: new Point(-10, 10, -30), //левый верхний угол
            P2: new Point(-10, -10, -30), //левый нижний угол
            P3: new Point(10, -10, -30) //правый нижний угол
        };

        //флажок мышки
        this.canMove = false;

        //флажки чекбоксов
        this.flags = {
            drawPoints: false,
            drawEdges: false,
            drawPolygons : true,
            animation: false,
            dark: false,
            light: false
        };

        //источник света
        this.LIGHT = new Light(-30, 30, 0, 37500);

        //массивы фигур и связанных анимаций
        this.figures = [];
        this.animations = [];

        //вывод нескольких фигур одновременно
        this.locationFigure = {
            R: 22,
            dt: Math.PI * 2 / 3,
            t: 0,
            k: 0,
        };

        //фон солнечной системы для анимации
        this.space = new Image();
        this.space.src = img;

        this.state = { figuresLength: this.figures.length };
    }

    componentDidMount() {
        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'canvas3D',
            width: 600,
            height: 600
        });

        this.math = new Math3D({
            WIN: this.WIN
        });

        //переменные для FPS
        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now(); 

        const animLoop = () => {
            //calc fps
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            //print scene
            this.math.calcPlaneEquation(this.WIN.CAMERA, this.WIN.DISPLAY); //плоскость экрана
            this.math.calcWinVectors(); //векторы экрана
            this.goAnimation(this.animations); //солнечная система
            this.run();
            window.requestAnimFrame(animLoop);
        }
        animLoop();
    }

    //перенос фигур и света
    keyDownHandler(e) {
        for (let i = 0; i < this.figures.length; i++) {
            switch (e.keyCode) {
                case 65: //a - сцена влево
                    return this.transformScene(this.math.move(1, 0, 0));
                case 68: //d - сцена вправо
                    return this.transformScene(this.math.move(-1, 0, 0));
                case 87: //w - сцена вверх
                    return this.transformScene(this.math.move(0, -1, 0));
                case 83: //s - сцена вниз
                    return this.transformScene(this.math.move(0, 1, 0));
                case 37: //стрелка влево - свет влево
                    return this.moveLight(-1, 0, 0);
                case 39: //стрелка вправо - свет вправо
                    return this.moveLight(1, 0, 0);
                case 38: //стрелка вверх - свет вверх
                    return this.moveLight(0, 1, 0);
                case 40: //стрелка вниз - свет вниз
                    return this.moveLight(0, -1, 0);
                default:
                    break;
            }
        }
    }

    //вынос общего из метода переноса света
    moveLight(dx, dy, dz) {
        if (this.flags.light) {
            this.LIGHT.x += dx;
            this.LIGHT.y += dy;
            this.LIGHT.z += dz;
        }
    }

    //зум
    wheel(e) {
        //e.preventDefault();
        const delta = (e.deltaY > 0) ? 0.3 : -0.3;
        this.transformScene(this.math.move(
            this.WIN.CAMERA.x * delta,
            this.WIN.CAMERA.y * delta,
            this.WIN.CAMERA.z * delta
        ));
    }

    /*************************************вращения*************************************/
    mouseMove(e) {
        const gradus = Math.PI / 180 / 4; 
        {
            const matrix = this.math.rotateOx((this.dy - e.clientY) * gradus);
            if (this.canMove) {
                if (this.flags.light) {
                    this.LIGHT.x += (e.movementX);
                    this.LIGHT.y -= (e.movementY);
                } else this.transformScene(matrix);
            }
        }
        const matrix = this.math.rotateOy((this.dx - e.clientX) * gradus);
        if (this.canMove) {
            if (this.flags.light) {
                this.LIGHT.x += (e.movementX);
                this.LIGHT.y -= (e.movementY);
            } else this.transformScene(matrix);
        }
        this.dx = e.clientX;
        this.dy = e.clientY;
    }

    mouseUp() {
        this.canMove = false;
    }

    mouseDown() {
        this.canMove = true;
    }

    /**********************************************************************************/

    //изменение сцены
    transformScene(matrix) {
        this.math.transform(matrix, this.WIN.CAMERA);
        this.math.transform(matrix, this.WIN.DISPLAY);
        this.math.transform(matrix, this.WIN.P1);
        this.math.transform(matrix, this.WIN.P2);
        this.math.transform(matrix, this.WIN.P3);
    }

    /*************************анимация солнечной системы*************************/
    figureAnimate(figure, parentMatrix = this.math.one()) {
        const matrix = figure.animations.reduce(
            (S, animation) => {
                const { method, value } = animation;
                const center = animation.center || figure.center;
                const { x, y, z } = center;
                let resMatrix = this.math.one();
                resMatrix = this.math.animateMatrix(-x, -y, -z, method, value);
                return this.math.multMatrixes(S, resMatrix);
            },
            parentMatrix
        );
        figure.points.forEach(point =>
            this.math.transform(matrix, point)
        );
        this.math.transform(matrix, figure.center);
        return figure.animations.reduce(
            (S, animation) => {
                const { method, value } = animation;
                const center = animation.center || figure.center;
                const { x, y, z } = center;
                let resMatrix = this.math.one();
                if (animation.check) {
                    return S;
                }
                resMatrix = this.math.animateMatrix(-x, -y, -z, method, value);
                return this.math.multMatrixes(S, resMatrix);
            },
            parentMatrix
        );
    }

    goAnimation(animations, parentMatrix) {
        if (this.flags.animation) {
            animations.forEach(anim => {
                const matrix = this.figureAnimate(anim.root, parentMatrix)
                if (anim.nodes) {
                    this.goAnimation(anim.nodes, matrix);
                }
            });
        }
    }

    /****************************************************************************/

    //удаляет фигуру
    delFigure() {
        this.figures.pop();
        this.setState({ figuresLength: this.figures.length });        
    }

    run() {
        //очистка экрана
        this.canvas.clear();

        //вывод фона и текста для анимации солнечной системы
        if (this.flags.animation && this.animations.length !== 0) {
            this.canvas.drawImg(this.space, 0, 0, 600, 600);
            this.figures.forEach(figure => {
                figure.animations.forEach(animation => {
                    if (animation.text) {
                        this.canvas.textAnim(
                            figure,
                            `${animation.text}`,
                            this.math.getProection(figure.points[0]),
                            this.math.getProection(figure.points[0]),
                            'white',
                            'black'
                        );
                    }
                });
            });
        }

        //print polygons
        if (this.flags.drawPolygons) {
            const polygons = [];
            this.figures.forEach((figure, index) => {
                this.math.calcCenters(figure);
                this.math.calcRadius(figure);
                this.math.calcDistance(figure, this.WIN.CAMERA, 'distance');
                this.math.calcDistance(figure, this.LIGHT, 'lumen');
                figure.polygons.forEach(polygon => {
                    polygon.figureIndex = index;
                    polygons.push(polygon);
                });
            });
            this.math.sortByArtistAlgoritm(polygons);
            polygons.forEach(polygon => {
                if (polygon.visibility) {
                    const figure = this.figures[polygon.figureIndex];
                    const points = polygon.points.map(point => {
                        return {
                            x: this.math.getProection(figure.points[point]).x,
                            y: this.math.getProection(figure.points[point]).y
                        }
                    });
                    let { r, g, b } = polygon.color;
                    let lumen = polygon.lumen;
                    if (this.flags.dark) {
                        const { isShadow, dark } = this.math.calcShadow(polygon, this.figures, this.LIGHT);
                        lumen = this.math.calcIllumination(
                            polygon.lumen,
                            this.LIGHT.lumen * (isShadow ? dark : 1)
                        );
                    } else lumen = this.math.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                    this.canvas.polygon3D(points, polygon.rgbToHex(r, g, b));
                }
            });
        }

        //print edges
        if (this.flags.drawEdges) {
            this.figures.forEach(figure => {
                figure.edges.forEach(edge => {
                    const point1 = this.math.getProection(figure.points[edge.p1]);
                    const point2 = this.math.getProection(figure.points[edge.p2]);
                    this.canvas.line3D(point1.x, point1.y, point2.x, point2.y)
                });
            });
        }

        //print points
        if (this.flags.drawPoints) {
            this.figures.forEach(figure => {
                figure.points.forEach(point => {
                    this.canvas.arc3D(
                        this.math.getProection(point).x,
                        this.math.getProection(point).y,
                    );
                });
            });
        }

        //вывод источника света
        this.canvas.arc3D(
            this.math.getProection(this.LIGHT).x,
            this.math.getProection(this.LIGHT).y,
            10,
            '#ffffff'
        );
        this.canvas.arc3D(
            this.math.getProection(this.LIGHT).x,
            this.math.getProection(this.LIGHT).y,
            8,
            '#ffff63'
        );

        //вывод FPS
        this.canvas.text(`FPS: ${this.FPS}`, -9.6, 9, '#e2228c');
    }

    render() {
        return (
            <div 
                className="graph3D" 
                onKeyDown={e => this.keyDownHandler(e)}
            >
                <canvas 
                    className="canvas" 
                    id="canvas3D"
                    onWheel={e => this.wheel(e)}
                    onMouseMove={e => this.mouseMove(e)}
                    onMouseUp={() => this.mouseUp()}
                    onMouseDown={() => this.mouseDown()}
                ></canvas>
                <Panel3D
                    flags={this.flags}
                    figures={this.figures}
                    delFigure={() => this.delFigure()}
                    figuresLength={this.state.figuresLength}
                    locationFigure={this.locationFigure}
                    move={(dx, dy, dz) => this.math.move(dx, dy, dz)}
                    transform={(matrix, point) => this.math.transform(matrix, point)}
                    animations={this.animations}
                    LIGHT={this.LIGHT}
                ></Panel3D>
                <div className="keysRules">
                    <p className="keysW">W</p>
                    <p className="keysA">A</p>
                    <p className="keysS">S</p>
                    <p className="keysD">D</p>
                    <p className="keys1">↑</p>
                    <p className="keys2">←</p>
                    <p className="keys3">↓</p>
                    <p className="keys4">→</p>
                </div>
                <div className="textRules">
                    <p className="text">-&nbsp;движение фигур</p>
                    <p className="text">-&nbsp;движение света</p>
                </div>
            </div>
        );
    }
}

export default Graph3D;