import React from "react";

import './funcInputs.css';

class FuncInputs extends React.Component {
    constructor(props) {
        super(props);
        const { func, index, delFunction } = props;
        this.func = func; //функция
        this.index = index; //индекс функции
        this.delFunction = delFunction; //чтобы удалить функцию
    }

    //добавить функцию
    setFunction(e) {
        try {
            let f;
            eval(`f = function(x){return ${e.target.value};}`);
            this.func.f = f;
            this.func.value = e.target.value;
        } catch (e) {
            //console.log(e);
        }
    }

    //изменить цвет
    setColor(e) {
        this.func.color = e.target.value;
    }

    //изменить ширину линии
    setWidth(e) {
        this.func.width = e.target.value;
    }

    //начало интеграла
    setStartIntegral(e) {
        this.func.startIntegral = e.target.value - 0;
    }

    //конец интеграла
    setEndIntegral(e) {
        this.func.endIntegral = e.target.value - 0;
    }

    //рисовать/не рисовать производную
    setDerevative(e) {
        this.func.derivativeX = e.target.checked;
    }

    render() {
        return (
            <div>
                <input
                    className="graph2D-input"
                    placeholder="y&nbsp;=&nbsp;f(x)"
                    onKeyUp={(e) => this.setFunction(e)}
                    defaultValue={this.func.value}
                ></input>
                <input
                    className="checkDerevative"
                    type="checkbox"
                    onChange={(e) => this.setDerevative(e)}
                    defaultChecked={this.func.derivativeX}
                ></input>
                <button
                    className="graph2D-button"
                    onClick={() => this.delFunction(this.index)}
                >удалить</button>
                <input
                    className="graph2D-input"
                    placeholder="start"
                    onKeyUp={(e) => this.setStartIntegral(e)}
                    defaultValue={this.func.startIntegral}
                ></input>
                <input
                    className="graph2D-input"
                    placeholder="end"
                    onKeyUp={(e) => this.setEndIntegral(e)}
                    defaultValue={this.func.endIntegral}
                ></input>
                <input
                    className="graph2D-input-square"
                    placeholder="square"
                    disabled={true}
                    defaultValue={this.func.square}
                ></input>
                <input
                    className="slider"
                    type="range" 
                    min="0.5" 
                    max="8.5"
                    onChange={(e) => this.setWidth(e)}
                    defaultValue={this.func.width}
                ></input>
                <input
                    className="colors"
                    type="color"
                    onChange={(e) => this.setColor(e)}
                    defaultValue={this.func.color}
                ></input>
            </div>
        );
    }
}

export default FuncInputs;