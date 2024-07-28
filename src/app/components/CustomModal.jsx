import React from 'react';
import '../assets/css/CustomModal.css';

function CustomModal({ isOpen, onClose, children }) {
    return (
        <div className='modal'>
            <div className='modal-content'>
                {children}
                <button className='close' onClick={() => onClose(false)}>X</button>
            </div>
        </div>
    );
}

export default CustomModal;
