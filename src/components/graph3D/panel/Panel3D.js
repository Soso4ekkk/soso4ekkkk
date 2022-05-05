import React from "react";

import cone from '../../../modules/graph3D/figures/cone';
import cube from '../../../modules/graph3D/figures/cube';
import sphera from '../../../modules/graph3D/figures/sphera';
import cylinder from '../../../modules/graph3D/figures/cylinder';
import tor from '../../../modules/graph3D/figures/tor';
import ellipsoid from '../../../modules/graph3D/figures/ellipsoid';
import ellipticalCylinder from '../../../modules/graph3D/figures/ellipticalCylinder';
import ellipticalParaboloid from '../../../modules/graph3D/figures/ellipticalParaboloid';
import hyperbolicCylinder from '../../../modules/graph3D/figures/hyperbolicCylinder';
import hyperbolicParaboloid from '../../../modules/graph3D/figures/hyperbolicParaboloid';
import oneSheetedHyperboloid from '../../../modules/graph3D/figures/oneSheetedHyperboloid';
import twoSheetedHyperboloid from '../../../modules/graph3D/figures/twoSheetedHyperboloid';
import parabolicCylinder from '../../../modules/graph3D/figures/parabolicCylinder';
import surprise from '../../../modules/graph3D/figures/surprise';

import Planets from "../../../modules/graph3D/figures/Planets";

class Panel3D extends React.Component {
    constructor(props) {
        super(props);
        const { 
            flags, 
            figures,
            delFigure, 
            locationFigure,
            move,
            transform,
            animations, 
            LIGHT
        } = props; 
        this.flags = flags;
        this.figures = figures; 
        this.delFigure = delFigure;
        this.locationFigure = locationFigure;
        this.move = move;
        this.transform = transform;
        this.animations = animations;
        this.LIGHT = LIGHT;

        this.planets = new Planets();

        this.state = { figuresLength: this.figures.length };
    }   

    //рисовать/не рисовать точки
    points(e) {
        this.flags.drawPoints = e.target.checked;
    }

    //рисовать/не рисовать ребра
    edges(e) {
        this.flags.drawEdges = e.target.checked;
    }

    //рисовать/не рисовать полигоны
    polygons(e) {
        this.flags.drawPolygons = e.target.checked;
    }

    //включить/выключить анимацию
    anim(e) {
        this.flags.animation = e.target.checked;
    }

    //рисовать/не рисовать тени
    shadow(e) {
        this.flags.dark = e.target.checked;
    }

    //двигать/не двигать свет
    shine(e) {
        this.flags.light = e.target.checked;
    }

    //выбор фигуры
    changeFigure(e) {
        let f = 0;
        switch (e.target.value) {
            case 'фигуры':
                f = 1;
                break;
            case 'конус':
                this.figures.push(new cone());
                break;
            case 'куб':
                this.figures.push(new cube());
                break;
            case 'сфера':
                this.figures.push(new sphera());
                break;
            case 'цилиндр':
                this.figures.push(new cylinder());
                break;
            case 'тор':
                this.figures.push(new tor());
                break;
            case 'эллипсоид':
                this.figures.push(new ellipsoid());
                break;
            case 'эллиптический цилиндр':
                this.figures.push(new ellipticalCylinder());
                break;
            case 'эллиптический параболоид':
                this.figures.push(new ellipticalParaboloid());
                break;
            case 'гиперболический цилиндр':
                this.figures.push(new hyperbolicCylinder());
                break;
            case 'гиперболический параболоид':
                this.figures.push(new hyperbolicParaboloid());
                break;
            case 'двухполостный гиперболоид':
                this.figures.push(new twoSheetedHyperboloid());
                break;
            case 'однополостный гиперболоид':
                this.figures.push(new oneSheetedHyperboloid());
                break;
            case 'параболический цилиндр':
                this.figures.push(new parabolicCylinder());
                break;
            case 'сюрприз :)':
                this.figures.push(new surprise());
                break;
            case 'солнечная система':
                this.planets.figures.forEach(figure => {
                    this.figures.push(figure);
                });
                this.planets.animations.forEach(anim => {
                    this.animations.push(anim)
                });
                break;
            default:
                break;
        }
        //вывод фигур по цилиндру
        if (f === 0) {
            const location = this.locationFigure;
            //определение расположения фигуры в цилиндре
            const matrix = this.move(
                location.R * Math.cos(location.t),
                location.R * Math.sin(location.t),
                location.k
            );
            //перемещение фигуры в свою позицию
            if (location.t < Math.PI * 2) {
                this.figures[this.figures.length - 1].points.forEach(point => {
                    this.transform(matrix, point);
                });
                location.t += location.dt;
            }
            //расстояние между тройками фигур
            if (location.t >= Math.PI * 2) {
                location.t = 0;
                location.k += 80;
            }
        }
    }

    //сила освещения
    setPowerLight(e) {
        this.LIGHT.lumen = e.target.value;
    }

    //удалить фигуру
    delateFigure() {
        this.delFigure();
        this.setState({ figuresLength: this.figures.length });
    }

    //изменить цвет фигур 
    setColor(e) {
        const color = e.target.value;
        for (let i = 0; i < this.figures.length; i++) {
            this.figures[i].polygons.forEach(poly => {
                poly.color = poly.hexToRgb(color);
            });
        }
    }

    render() {
        return (
            <div>
                <div className="checkbox">
                    <input  
                        className="check3D" 
                        type="checkbox" 
                        onChange={e => this.points(e)} 
                        defaultChecked={this.flags.drawPoints}
                    ></input><label>&nbsp;точки</label> 
                    <br></br>
                    <input 
                        className="check3D" 
                        type="checkbox" 
                        onChange={e => this.edges(e)} 
                        defaultChecked={this.flags.drawEdges}
                    ></input>
                    <label>&nbsp;ребра</label>
                    <br></br>
                    <input  
                        className="check3D" 
                        type="checkbox" 
                        onChange={e => this.polygons(e)} 
                        defaultChecked={this.flags.drawPolygons}
                    ></input>
                    <label>&nbsp;полигоны</label>
                    <br></br>
                    <input 
                        className="check3D" 
                        type="checkbox" 
                        onChange={e => this.anim(e)} 
                        defaultChecked={this.flags.animation}
                    ></input>
                    <label>&nbsp;анимация</label>
                    <br></br>
                    <input
                        className="check3D" 
                        type="checkbox" 
                        onChange={e => this.shadow(e)} 
                        defaultChecked={this.flags.dark}
                    ></input>
                    <label>&nbsp;тени</label>
                    <br></br>
                    <input
                        className="check3D" 
                        type="checkbox" 
                        onChange={e => this.shine(e)} 
                        defaultChecked={this.flags.light}
                    ></input>
                    <label>&nbsp;свет</label>  
                </div> 
                <select 
                    className="figures" 
                    onChange={e => this.changeFigure(e)}
                >
                    <option>фигуры</option>
                    <option>конус</option>
                    <option>куб</option>
                    <option>сфера</option>
                    <option>цилиндр</option>
                    <option>тор</option>
                    <option>эллипсоид</option>
                    <option>эллиптический&nbsp;параболоид</option>
                    <option>эллиптический&nbsp;цилиндр</option>
                    <option>однополостный&nbsp;гиперболоид</option>
                    <option>двухполостный&nbsp;гиперболоид</option>
                    <option>гиперболический&nbsp;цилиндр</option>
                    <option>гиперболический&nbsp;параболоид</option>
                    <option>параболический&nbsp;цилиндр</option>
                    <option>сюрприз&nbsp;:)</option>
                    <option>солнечная&nbsp;система</option>
                </select>
                <button className="delate" onClick={() => this.delateFigure()}>удалить</button>
                <input 
                    className="powerlight" 
                    type="range" 
                    min="25000" 
                    max="100000"
                    onChange={e => this.setPowerLight(e)}
                    defaultValue={this.LIGHT.lumen}
                ></input>
                <input className="color" type="color" onChange={e => this.setColor(e)}></input>
            </div>
        );
    }
}

export default Panel3D;