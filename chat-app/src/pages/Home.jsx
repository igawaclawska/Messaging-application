import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../containers/Navbar'
import ThreadsBar from '../containers/ThreadsBar'
import ChatArea from '../containers/ChatArea'
import '../styles.css'

export const Home = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // updates the width variable value in real time
    useEffect(() => {
        const handleResize = () => {setWindowWidth(window.innerWidth)};
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize)};
    }, []);

    const [isThreadsBarVisible, setIsThreadsBarVisible] = useState(true);
    const handleClick = () => {
        setIsThreadsBarVisible(current => !current);
    };
  
    return (
        <div className='main-container'>
            <Navbar/>
            {/* condition below toggles between mobile and desktop view */}
            {windowWidth <= 576 ? (
            <div className='main-div'>
                {/* condition below works for small screens and allows to toggle visibility between the ThreadsBar and the ChatArea  */}
                {isThreadsBarVisible ? (<ThreadsBar visibility={handleClick} threadInput={threadsArray}/>) : (
                <ChatArea visibility={handleClick}/>)}
            </div> ) : (
            <>
            <ThreadsBar threadInput={threadsArray}/>
            <ChatArea/>
            </> 
            )}
        </div>
    )
}
export default Home;


  //Fake hardcoded data for generating dynamic single threads, it is inserted into the threadInput prop of the ThreadList
  //component. This data will be later taken from the db

  const threadsArray = [
    {id: 1, author: 'John K.', message: 'Hi!'},
    {id: 2, author: 'Ana S.', message: 'Are you available tomorrow?'},
    {id: 3, author: 'Max P.', message: 'This is sooo cool!'},
    {id: 4, author: 'Siri A.', message: 'LOL'},
    {id: 5, author: 'Tom N.', message: 'Are you sure?'},
    {id: 6, author: 'Natalie N.', message: 'Hahahaha :D'},
]