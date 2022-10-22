import Navbar from '../containers/Navbar'
import ThreadHeader from '../containers/ThreadHeader'
import '../styles.css'

export const Home = () => {
    return (
        <div className="Main-container">
            <Navbar></Navbar>
            <sidebar className="threads-bar">
                <ThreadHeader></ThreadHeader>
            </sidebar>
            <content className="chat-area">

            </content>
        </div>
    )
}
export default Home;