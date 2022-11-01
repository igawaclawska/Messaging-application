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
                {/* <div className="modal-div" show={show} >
                <MessageModal />
                </div> */}
                <sidebar className="threads-bar">
                    <ThreadHeader></ThreadHeader>
                    <ThreadList threadInput={threadsArray}></ThreadList>
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


  //Fake hardcoded data for generating dynamic single threads, it is inserted into the threadInput prop of the ThreadList
  //component. This data will be later taken from the db

  const threadsArray = [
    {id: 1, author: 'John K.', message: "Hi!"},
    {id: 2, author: 'Ana S.', message: "Are you available tomorrow?"},
    {id: 3, author: 'Max P.', message: "This is sooo cool!"},
    {id: 4, author: 'Siri A.', message: "LOL"},
    {id: 5, author: 'Tom N.', message: "Are you sure?"},
    {id: 6, author: 'Natalie N.', message: "Hahahaha :D"},
]