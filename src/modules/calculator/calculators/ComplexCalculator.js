import RealCalculator from './RealCalculator';

import { Complex } from '../types';

class ComplexCalculator extends RealCalculator {
    inv(a) {
        return new Complex(
            a.re / (a.re * a.re + a.im * a.im), -a.im / (a.re * a.re + a.im * a.im)
        );
    }

    add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b) {
        return new Complex(
            a.re * b.re - a.im * b.im,
            a.re * b.im + a.im * b.im
        );
    }

    div(a, b) {
        return new Complex(this.mult(a, this.inv(b)));
    }

    prod(a, p) {
        return new Complex(p * a.re, p * a.im);
    }

    pow(a, n) {
        let c = this.one();
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    zero() {
        return new Complex();
    }

    one() {
        return new Complex(super.one());
    }
}

export default ComplexCalculator;