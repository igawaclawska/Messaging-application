import React from 'react';
import Button from '../components/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../styles.css'
import '../buttons.css'

const ChatHeader = ({ onLoad, onClick }) => {
    
    return (
        <header className="chat-header">
            <div className="chat-header-wrapper">
                <div onClick={onClick} className="backBtn"><Button className="fixed-btn tertiary with-icon" text='' icon={<ArrowBackIosIcon/>}></Button>                </div>
                <span className="chat-header-title">Name Secondname</span>
            </div>
        </header>
    );
}

export default ChatHeader;