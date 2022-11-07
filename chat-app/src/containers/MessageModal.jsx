import React from 'react';
import InputField from '../components/InputField'
import Button from '../components/Button'
import '../styles.css'
import '../buttons.css'

const MessageModal = ({ show }) => {

    return (
        <div onClick={() => show(false)} className='modal-div'>
            <div onClick={close => close.stopPropagation()} className="create-message-wrapper">
                <div className='create-message-header'>
                    <h1>Create new chat</h1>
                </div>
                <div className='create-message-body'>
                    <h3><b>receivers:</b></h3>
                    <div className="add-receivers">
                        <InputField placeholder="Receiver's ITU e-mail"></InputField>
                        <div className="add-btn">
                        <Button className='fluid-btn secondary' icon="" text="+ Add receivers" ></Button>
                        </div>
                    </div>
                </div>
                <div className='create-message-footer'>
                    <Button className='fluid-btn tertiary' onClick={() => show(false)} text="Cancel" icon=""></Button>
                    <Button className='fluid-btn primary' onClick={() => show(false)} text="Create chat" icon=""></Button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;