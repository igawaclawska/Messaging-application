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
            <h1>Create new chat</h1>
            <subtitle><b>receivers:</b></subtitle>
            <div className="add-receivers">
                <div className="receivers-mail">
                <InputField placeholder="Receiver's ITU e-mail"></InputField>
                </div>
                <div className="add-btn">
                <SecondaryButton text="+ Add receivers"></SecondaryButton>
                </div>
            </div>
            <div className="cancel-or-create">
                <div className="cancel-btn">
                    <TertiaryButton text="Cancel"></TertiaryButton>
                </div>
                <div className="create-btn">
                    <Button text="Create chat" ></Button>
                </div>
            </div>
        </div>

    );
};

export default MessageModal;