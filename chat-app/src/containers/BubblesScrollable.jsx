import React from 'react';
import RightChatBubble from '../components/RightChatBubble';
import LeftChatBubble from '../components/LeftChatBubble';
import '../styles.css'

const BubblesScrollable = ({ onLoad }) => {
    return (
            <div className="bubbles-scrollable">
                <RightChatBubble text='Hi'></RightChatBubble>
                <RightChatBubble text='This is a looooooooooooooooooooooooong message'></RightChatBubble>
                <RightChatBubble text='This is a letter: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'></RightChatBubble>
                <LeftChatBubble></LeftChatBubble>
                <LeftChatBubble text='Nej'></LeftChatBubble>
                <LeftChatBubble text='This is another letter: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'></LeftChatBubble>
            </div>
    );
}

export default BubblesScrollable;