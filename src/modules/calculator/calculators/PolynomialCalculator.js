import RealCalculator from './RealCalculator';

import { Member, Polynomial } from '../types';

class PolynomialCalculator {
    constructor(calc = new RealCalculator()) {
        this.calc = calc;
    }

    polynomial(members = []) {
        return new Polynomial(members);
    }

    add(a, b) {
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(this.calc.add(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(el => el.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        let length = members.length;
        for (let i = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                length--;
                members.slice(0, i);
            }
        }
        if (length === 0) { return 0; }
        return new Polynomial(members);
    }

    sub(a, b) {
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);

            if (member) {
                members.push(new Member(this.calc.sub(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });

        b.poly.forEach(elemB => {
            if (!members.find(el => el.power === elemB.power)) {
                members.push(new Member(this.calc.prod(elemB.value, -1), elemB.power));
            }
        });
        let length = members.length;
        for (let i = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                length--;
                members.slice(0, i);
            }
        }
        if (length === 0) { return 0; }
        return new Polynomial(members);
    }

    mult(a, b) {
        let polynomial = new Polynomial();
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member(
                    this.calc.mult(elemA.value, elemB.value),
                    this.calc.add(elemA.power, elemB.power)
                ));
            });
            for (let i = members.length - 1; i >= 0; i--) {
                if (members[i].value === 0) {
                    return members.slice(0, i);
                }
            }
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }

    prod(a, p) {
        const members = [];
        a.poly.forEach(elemA => {
            members.push(new Member(this.calc.prod(elemA.value, p), elemA.power));
        });
        for (let i = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                return members.slice(0, i);
            }
        }
        return new Polynomial(members);
    }
}

export default PolynomialCalculator;