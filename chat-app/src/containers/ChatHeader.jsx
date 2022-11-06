import React from 'react';
import TertiaryButton from '../components/TertiaryButton'
import '../styles.css'

const ChatHeader = ({ onLoad, onClick }) => {
    
    return (
        <header className="chat-header">
            <div className="chat-header-wrapper">
                <div onClick={onClick} className="backBtn"><TertiaryButton className="tertiaryBtn-fixed-size" text='<'></TertiaryButton>                </div>
                <span className="chat-header-title">Name Secondname</span>
            </div>
        </header>
    );
}

export default ChatHeader;