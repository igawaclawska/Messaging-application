import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../containers/Navbar'
import ThreadsBar from '../containers/ThreadsBar'
import ChatArea from '../containers/ChatArea'
import {auth} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import '../styles.css'

export const Home = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [user] = useAuthState(auth);
    // updates the width variable value in real time
    useEffect(() => {
        const handleResize = () => {setWindowWidth(window.innerWidth)};
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize)};
    }, []);

    const [isThreadsBarVisible, setIsThreadsBarVisible] = useState(true);


    // toggles visibility between <ChatArea> and <ThreadsBar> components, is called only when the screen withh is <= 576px
    // is passed as a second onclick function to the <SingleThread> as a visibility prop
    const handleClick = () => {
        setIsThreadsBarVisible(current => !current);
    };

    // this function does nothing, is called when the screen width is above 576px,
    // it exists only because the <SingleThread> component still expects this function to be executed from its prop
    // this is a temporary solution
    const placeholderHandleClick = () => {
        setIsThreadsBarVisible(null);
    }
  
    return (
        <div className='main-container'>
            <Navbar/>
            <div className='home-body'>
            {/* condition below toggles between mobile and desktop view */}
            {windowWidth <= 576 ? (
            <div className='main-div'>
                {/* condition below works for small screens and allows to toggle visibility between the ThreadsBar and the ChatArea  */}
                {isThreadsBarVisible ? (<ThreadsBar visibility={handleClick} 
                // threadInput={threadsArray}
                />) : (
                <ChatArea visibility={handleClick}/>)}
            </div> ) : (
            <>
            <ThreadsBar visibility={placeholderHandleClick} 
            // threadInput={threadsArray}
            />
            <ChatArea visibility={placeholderHandleClick}/>
            </> 
            )}
            </div>
        </div>
    )
}
export default Home;


  //Fake hardcoded data for generating dynamic single threads, it is inserted into the threadInput prop of the ThreadList
  //component. This data will be later taken from the db

//   const threadsArray = [
//     {id: 1, author: 'John K.', message: 'Hi!'},
//     {id: 2, author: 'Ana S.', message: 'Are you available tomorrow?'},
//     {id: 3, author: 'Max P.', message: 'This is sooo cool!'},
//     {id: 4, author: 'Siri A.', message: 'LOL'},
//     {id: 5, author: 'Tom N.', message: 'Are you sure?'},
//     {id: 6, author: 'Natalie N.', message: 'Hahahaha :D'},
// ]
