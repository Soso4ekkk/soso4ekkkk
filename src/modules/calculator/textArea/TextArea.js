import React from 'react';

class TextArea extends React.Component {
    constructor(props) {
        super(props);
        const { value, className, placeholder, disabled, onChange } = props;
        this.state = { value };
        this.className = className;
        this.placeholder = placeholder;
        this.disabled = disabled;
        this.onChange = onChange;
    }

    setDisabled() {
        return this.disabled ? 'disabled' : '';
    }

    render() {
        return (
            <textarea 
                className={this.className}
                placeholder={this.placeholder}
                disabled={this.setDisabled()}
                defaultValue={this.state.value}
                onChange={e => this.onChange(e)}
            ></textarea>
        );
    }
}

export default TextArea;