class RealCalculator {
    add(a, b) {
        return a + b;
    }

    sub(a, b) {
        return a - b;
    }

    mult(a, b) {
        return a * b;
    }

    div(a, b) {
        return a / b;
    }

    prod(a, p) {
        return a * p;
    }

    pow(a, n) {
        return Math.pow(a, n);
    }

    zero() {
        return 0;
    }

    one() {
        return 1;
    }
}

export default RealCalculator;