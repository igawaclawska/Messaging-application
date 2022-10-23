import React from 'react';
import TertiaryButton from '../components/TertiaryButton'
import '../styles.css'

const ChatHeader = ({ onLoad }) => {
    return (
        <header className="chat-header">
            <div className="chat-header-wrapper">
                <div className="backBtn"><TertiaryButton className="tertiaryBtn" text='<Back'></TertiaryButton>                </div>
                <span className="chat-header-title">Name Secondname</span>
            </div>
        </header>
    );
}

export default ChatHeader;