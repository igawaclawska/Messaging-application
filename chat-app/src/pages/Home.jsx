import Navbar from '../containers/Navbar'
import ThreadHeader from '../containers/ThreadHeader'
import ThreadList from '../containers/ThreadList'
import ChatHeader from '../containers/ChatHeader'
import BubblesScrollable from '../containers/BubblesScrollable'
import SendMessage from '../containers/SendMessage'
import '../styles.css'
import { useState } from 'react';
import MessageModal from '../containers/MessageModal'
import Button from '../components/Button'

export const Home = () => {
    const [show, setShow] = useState(false);
  
    return (
        <div className="main-container">
            <Navbar></Navbar>
            <div className="main-div">
                <div className="modal-div" show={show} >
                <MessageModal />
                </div>
                <sidebar className="threads-bar">
                    <ThreadHeader></ThreadHeader>
                    <ThreadList></ThreadList>
                </sidebar>
                <content className="chat-area">
                    <ChatHeader></ChatHeader>
                    <BubblesScrollable></BubblesScrollable>
                    <SendMessage></SendMessage>
                </content>
            </div>
        </div>
    )
}
export default Home;