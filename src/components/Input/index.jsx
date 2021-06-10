import React from 'react'
import classNames from 'classnames';
import './input.scss';



const Auth = ({ inputType, inputName, labelText, errorMessage, onInputHandler }) => {
    return (
        <div className={classNames('input__field', {
            'input__field--error': errorMessage !== null
        })}>
            <label className="input__label">
                <span className="input__label-text">{labelText}</span>
                <input className="input" type={inputType} name={inputName} onChange={(event) => { onInputHandler(event) }} />
            </label>
            {errorMessage &&
                <div className="input__error-message">{errorMessage}</div>
            }
        </div>
    );
};

export default Auth;