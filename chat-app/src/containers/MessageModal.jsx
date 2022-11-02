import React from 'react';
import InputField from '../components/InputField'
import SecondaryButton from '../components/SecondaryButton'
import TertiaryButton from '../components/TertiaryButton'
import Button from '../components/Button'
import '../styles.css'
import { useState } from 'react';


const MessageModal = props => {
    if (!props.show) {
        return 
    }
    return (
        <div className="create-message-wrapper">
            <div className='create-message-header'>
                <h1>Create new chat</h1>
            </div>
            <div className='create-message-body'>
                <subtitle><b>receivers:</b></subtitle>
                <div className="add-receivers">
                    <InputField placeholder="Receiver's ITU e-mail"></InputField>
                    <div className="add-btn">
                    <SecondaryButton text="+ Add receivers"></SecondaryButton>
                    </div>
                </div>
            </div>
            <div className='create-message-footer'>
                <TertiaryButton text="Cancel"></TertiaryButton>
                <Button text="Create chat" ></Button>
            </div>
        </div>

    );
};

export default MessageModal;