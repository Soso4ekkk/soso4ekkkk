import solarSystem from './solarSystem';
import ringForSaturn from './ringForSaturn';

import Point from '../entities/Point';

class Planets {

    /**************переменные для солнечной системы**************/
    Sun = new solarSystem(
        20, 10, new Point(), "#ffff00", [{
            //вращение вокруг своей оси
            method: 'rotateOz',
            value: -(Math.PI / 180 / 3),
            text: "Солнце",
            check: true
        }]
    );

    Mercury = new solarSystem(
        20, 2, new Point(-20, 0, 0), "#faebd7", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 480,
            center: new Point(),
            text: "Меркурий"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: -Math.PI / 180,
            check: true
        }]
    );

    Venus = new solarSystem(
        20, 3, new Point(-30, 0, 0), "#ffa07a", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 500,
            center: new Point(),
            text: "Венера"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: -Math.PI / 180,
            check: true
        }]
    );

    Earth = new solarSystem(
        20, 5, new Point(-45, 0, 0), "#1e90ff", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 510,
            center: new Point(),
            text: "Земля"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: -Math.PI / 180,
            check: true
        }]
    );

    Moon = new solarSystem(
        20, 1, new Point(-55, 0, 0), "#808080", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 510,
            center: this.Earth.center,
            text: "Луна"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: Math.PI / 360,
            check: true
        }]
    );

    Mars = new solarSystem(
        20, 4, new Point(-65, 0, 0), "#cd853f", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 560,
            center: new Point(),
            text: "Марс"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: -Math.PI / 180 / 1.2,
            check: true
        }]
    );

    Jupiter = new solarSystem(
        20, 10, new Point(-85, 0, 0), "#ffdab9", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 640,
            center: new Point(),
            text: "Юпитер"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: -Math.PI / 180 / 1.4,
            check: true
        }]
    );

    Saturn = new solarSystem(
        20, 8, new Point(-115, 0, 0), "#eee8aa", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 720,
            center: new Point(),
            text: "Сатурн"
        }, { //вращение вокруг себя любимогом
            method: 'rotateOz',
            value: -Math.PI / 180 / 1.7,
            check: true
        }]
    );

    RingForSaturn = new ringForSaturn(
        20, 16, new Point(-115, 0, 0), "#a39f72", [{
            //вращение вокруг солнышка
            method: 'rotateOy',
            value: -Math.PI / 720,
            center: this.Saturn.center
        }, { //вращение вокруг себя любимого
            method: 'rotateOx',
            value: Math.PI / 360,
            center: this.Saturn.center,
            check: true
        }]
    );

    Uranium = new solarSystem(
        20, 5, new Point(-150, 0, 0), "#9acd32", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 770,
            center: new Point(),
            text: "Уран"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: -Math.PI / 180 / 2.2,
            check: true
        }]
    );

    Neptune = new solarSystem(
        20, 5.3, new Point(-170, 0, 0), "#4169e1", [{
            //вращение вокруг солнышка
            method: 'rotateOz',
            value: -Math.PI / 900,
            center: new Point(),
            text: "Нептун"
        }, { //вращение вокруг себя любимого
            method: 'rotateOz',
            value: -Math.PI / 180 / 2.7,
            check: true
        }]
    );

    /************************************************************/

    //заполнение массива солнечной системы
    figures = [
        this.Sun,
        this.Mercury,
        this.Venus,
        this.Earth,
        this.Moon,
        this.Mars,
        this.Jupiter,
        this.Saturn,
        this.RingForSaturn,
        this.Uranium,
        this.Neptune
    ];

    //массив связанных анимаций
    animations = [{
        root: this.Sun,
        nodes: [
            { root: this.Mercury },
            { root: this.Venus },
            { root: this.Earth, nodes: [{ root: this.Moon }] },
            { root: this.Mars },
            { root: this.Jupiter },
            { root: this.Saturn, nodes: [{ root: this.RingForSaturn }] },
            { root: this.Uranium },
            { root: this.Neptune }
        ]
    }];
}

export default Planets;