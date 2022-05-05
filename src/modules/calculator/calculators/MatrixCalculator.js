import RealCalculator from './RealCalculator';

import { Matrix } from '../types';

class MatrixCalculator {
    constructor(calc = new RealCalculator()) {
        this.calc = calc;
    }
    
    add(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.calc.add(elem, b.values[i][j])))
        );
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.calc.sub(elem, b.values[i][j])))
        );
    }

    mult(a, b) {
        const c = this.zero(a.values.length);
        for (let i = 0; i < c.values.length; i++) {
            for (let j = 0; j < c.values[i].length; j++) {
                let S = this.calc.zero(a.values.length);
                for (let k = 0; k < a.values.length; k++) {
                    S = this.calc.add(
                        S,
                        this.calc.mult(
                            a.values[i][k],
                            b.values[k][j])
                    );
                }
                c.values[i][j] = S;
            }
        }
        return c;
    }

    div() {
        return null;
    }

    prod(a, p) {
        return new Matrix(a.values.map((arr) =>
            arr.map(elem => this.calc.mult(elem, p)))
        );
    }

    pow(a, n) {
        let c = this.one(a.values.length);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = (i === j) ? this.calc.one(length) : this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }
}

export default MatrixCalculator;