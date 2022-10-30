import React from 'react';
import { useState } from 'react';
import Button from '../components/Button'
import MessageModal from './MessageModal';
import '../styles.css'

const ThreadHeader = ({ onLoad }) => {
    const [show, setShow] = useState(false);

    return (
        <header className="thread-header">
            <div className="thread-header-wrapper">
                <span className="thread-header-title">Chats</span>
                <Button className="primaryBtn-fixed-size" text='Create Message' onClick={() => setShow(true)}></Button>
            </div> 
            <div >
                <MessageModal show={show}/>
            </div>
        </header>

    );
}

export default ThreadHeader;