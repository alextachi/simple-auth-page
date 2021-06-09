import React from 'react'
import classNames from 'classnames';

import './button.scss';



const Button = ({ disabled, primary, submit, icon, children, title, onClick }) => {
    return (
        <button
            className={classNames('button', {
                'button--disabled': disabled,
                'button--primary': primary,
                'button--with-icon': icon
            })}
            disabled={disabled}
            type={submit ? "submit" : null}
            title={title}
            onClick={onClick}
        >

            {children}

        </button>
    );
};

export default Button;