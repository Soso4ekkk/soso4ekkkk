import React from 'react';

import TextArea from '../../modules/calculator/textArea/TextArea';
import UniversalCalculator from '../../modules/calculator/UniversalCalculator';

import './calculator.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        const { valueResult } = props;
        this.state = { valueResult };
        this.A = 0;
        this.B = 0;
    }

    componentDidMount() {
        this.calculator = new UniversalCalculator();
    }

    operation(operand) {
        let a = this.calculator.toValue(this.A);
        let b = this.calculator.toValue(this.B);
        if (a && b) {
            let c;
            if (operand === 'zero' || operand === 'one')
                c = this.calculator[operand](null, a);
            else c = this.calculator[operand](a, b);
            this.setState({ valueResult: c.toString() });
        }
    }

    setA(e) {
        this.A = e.target.value;
    }

    setB(e) {
        this.B = e.target.value;
    }
    
    render() {
        return (
            <div className="calculator">
                <div>
                    <div>
                        <TextArea
                            className="numbers" 
                            placeholder="0"
                            onChange={e => this.setA(e)}
                        ></TextArea>
                        <TextArea
                            className="numbers" 
                            placeholder="0"
                            onChange={e => this.setB(e)}
                        ></TextArea>
                    </div>
                    <div>
                        <TextArea
                            className="result" 
                            placeholder="result" 
                            disabled={true}
                            key={this.state.valueResult}
                            value={this.state.valueResult}
                        ></TextArea>
                    </div>
                </div>
                <div>
                    <button onClick={() => this.operation("add")}>&nbsp;Add&nbsp;</button>
                    <button onClick={() => this.operation("sub")}>&nbsp;Sub&nbsp;</button>
                    <button onClick={() => this.operation("mult")}>&nbsp;Mult&nbsp;</button>
                </div>
                <div>
                    <button onClick={() => this.operation("div")}>&nbsp;Div&nbsp;</button>
                    <button onClick={() => this.operation("prod")}>&nbsp;Prod&nbsp;</button>
                    <button onClick={() => this.operation("pow")}>&nbsp;Pow&nbsp;</button>
                </div>
                <div>
                    <button onClick={() => this.operation("one")}>&nbsp;One&nbsp;</button>
                    <button onClick={() => this.operation("zero")}>&nbsp;Zero&nbsp;</button>
                </div>
                <div>
                    <h2 className="h2">формат&nbsp;ввода:</h2>
                    <p className="rules">
                        обычные&nbsp;числа&nbsp;(&nbsp;1&nbsp;)<br></br>
                        комплексные&nbsp;числа&nbsp;(&nbsp;1+/-i*2&nbsp;)<br></br>
                        вектора&nbsp;(&nbsp;(1&nbsp;2&nbsp;3)&nbsp;)<br></br>
                        матрицы&nbsp;(&nbsp;1,&nbsp;2&nbsp;/n&nbsp;3,&nbsp;4&nbsp;)<br></br>
                        полиномиалы&nbsp;(&nbsp;1*x^2+/-2*x^3&nbsp;)
                    </p>
                </div>
            </div>
        );
    }
}

export default Calculator;