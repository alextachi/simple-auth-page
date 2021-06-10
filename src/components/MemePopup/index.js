import React from 'react'
import './meme.scss';
import {Lightbox } from "react-modal-image";


const MemePopup = ({ isOpened, onClose, imageURL }) => {

    const handleClose = (e) => {
        onClose();
    };

    return (
        <>
            {(isOpened) &&
                <Lightbox
                    large={imageURL}
                    alt="Hello World! I'm random meme!"
                    onClose={handleClose}
                />
            }
        </>
    );
};

export default MemePopup;