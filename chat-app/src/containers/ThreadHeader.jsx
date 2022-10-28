import React from 'react';
import Button from '../components/Button'
import '../styles.css'

const ThreadHeader = ({ onLoad }) => {
    return (
        <header className="thread-header">
            <div className="thread-header-wrapper">
                <span className="thread-header-title">Chats</span>
                    <Button className="primaryBtn-fixed-size" text='Create Message'></Button>
            </div>
        </header>
    );
}

export default ThreadHeader;