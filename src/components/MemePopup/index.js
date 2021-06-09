import React from 'react'
import Modal from 'react-modal';
import './meme.scss';

Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '80%',
    },
};

const MemePopup = ({ trigger, onClose, imageURL}) => {

    const handleClose = (e) => {
        onClose();
    }

    return (
        <Modal
            isOpen={trigger}
            contentLabel="Meme modal"
            style={customStyles}
        >
            <h2>Hello, I'm random meme</h2>
            <button onClick={handleClose}>Close</button>
            <br/>
            
            <br/>
            <img src={imageURL} alt="Random meme"/>
        </Modal>
    );
};

export default MemePopup;