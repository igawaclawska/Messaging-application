import React from 'react';
import TertiaryButton from '../components/TertiaryButton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../styles.css'

const ChatHeader = ({ onLoad }) => {
    return (
        <header className="chat-header">
            <div className="chat-header-wrapper">
                <div className="backBtn"><TertiaryButton className="tertiaryBtn-fixed-size" text='' icon={<ArrowBackIosIcon/>}></TertiaryButton>                </div>
                <span className="chat-header-title">Name Secondname</span>
            </div>
        </header>
    );
}

export default ChatHeader;