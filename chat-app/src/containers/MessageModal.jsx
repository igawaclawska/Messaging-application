import React from 'react';
import InputField from '../components/InputField'
import SecondaryButton from '../components/SecondaryButton'
import TertiaryButton from '../components/TertiaryButton'
import Button from '../components/Button'
import '../styles.css'

const MessageModal = ({ show }) => {

    return (
        <div onClick={() => show(false)} className='modal-div'>
            <div onClick={close => close.stopPropagation()} className="create-message-wrapper">
                <div className='create-message-header'>
                    <h1>Create new chat</h1>
                </div>
                <div className='create-message-body'>
                    <subtitle><b>receivers:</b></subtitle>
                    <div className="add-receivers">
                        <InputField placeholder="Receiver's ITU e-mail"></InputField>
                        <div className="add-btn">
                        <SecondaryButton className='fluid-btn secondary' icon="" text="+ Add receivers" ></SecondaryButton>
                        </div>
                    </div>
                </div>
                <div className='create-message-footer'>
                    <TertiaryButton className='fluid-btn tertiary' onClick={() => show(false)} text="Cancel" icon=""></TertiaryButton>
                    <Button className='fluid-btn primary' onClick={() => show(false)} text="Create chat" icon=""></Button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;