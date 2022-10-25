import Navbar from '../containers/Navbar'
import ThreadHeader from '../containers/ThreadHeader'
import ThreadList from '../containers/ThreadList'
import ChatHeader from '../containers/ChatHeader'
import '../styles.css'

export const Home = () => {
    return (
        <div className="main-container">
            <Navbar></Navbar>
            <div>
                <sidebar className="threads-bar">
                    <ThreadHeader></ThreadHeader>
                    <ThreadList></ThreadList>
                </sidebar>
                <content className="chat-area">
                    <ChatHeader></ChatHeader>
                </content>
            </div>
        </div>
    )
}
export default Home;