import RealCalculator from './RealCalculator';

import { Vector } from '../types';

class VectorCalculator {
    constructor(calc = new RealCalculator()) {
        this.calc = calc;
    }
    
    add(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.add(elem, b.values[i])));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.sub(elem, b.values[i])));
    }

    mult(a, b) {
        return new Vector([
            this.calc.sub(this.calc.mult(a.values[1], b.values[2]), this.calc.mult(a.values[2], b.values[1])),
            this.calc.sub(this.calc.mult(a.values[2], b.values[0]), this.calc.mult(a.values[0], b.values[2])),
            this.calc.sub(this.calc.mult(a.values[0], b.values[1]), this.calc.mult(a.values[1], b.values[0]))
        ]);
    }

    div() {
        return null;
    }

    prod(a, p) {
        return new Vector(a.values.map(elem => this.calc.mult(elem, p)));
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
            values.push(this.calc.zero(length));
        }
        return new Vector(values);
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.one(length));
        }
        return new Vector(values);
    }
}

export default VectorCalculator;