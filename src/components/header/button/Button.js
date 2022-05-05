import React from 'react';

import './button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
        const { title, name, isActive, onClick } = props;
        this.name = name;
        this.title = title;
        this.isActive = isActive === name;
        this.onClick = onClick;
    }

    //выбор стиля кнопок меню
    setActive() {
        return `field ${this.isActive ? 'active' : ''}`;
    }

    render() {
        return (
            <div
                className={this.setActive()}
                onClick={() => this.onClick(this.name)}
            >{this.title}</div>
        );
    }
}

export default Button;