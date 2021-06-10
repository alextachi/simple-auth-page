import React from 'react';

const LoadingButton = () => {
    return (
        <svg className="loading-image"  viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" stroke="#0a0a0a" strokeWidth="4" r="23" strokeDasharray="108.38494654884786 38.12831551628262">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.639344262295082s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    );
};

export default LoadingButton;