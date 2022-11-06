import ChatHeader from "./ChatHeader";
import BubblesScrollable from "./BubblesScrollable";
import SendMessage from "./SendMessage";

const ChatArea = ({ onLoad, visibility }) => {

    return (
        <content className="chat-area">
                    <ChatHeader onClick={visibility}></ChatHeader>
                    <BubblesScrollable></BubblesScrollable>
                    <SendMessage></SendMessage>
        </content>
    );
}

export default ChatArea;