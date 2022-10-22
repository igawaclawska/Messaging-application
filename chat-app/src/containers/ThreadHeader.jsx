import React from 'react';
import Button from '../components/Button'
import '../styles.css'

const ThreadHeader = ({ onLoad }) => {
    return (
        <header className="thread-header">
            <div className="thread-header-wrapper">
                <span className="thread-header-title">Chats</span>
                <div className="createChatSection">
                    <Button className="primaryBtn" text='Create Message'></Button>
                </div>
            </div>
        </header>
    );
}

export default ThreadHeader;