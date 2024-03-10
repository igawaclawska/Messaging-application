import "./Home.css";
import { useState, useContext } from "react";
import { WindowSizeContext } from "../../context/WindowSizeContext";
import Navbar from "../../containers/navbar/Navbar";
import ThreadsBar from "../../containers/threads-bar/ThreadsBar";
import ChatArea from "../../containers/chat-area/ChatArea";

export const Home = () => {
  const { windowWidth } = useContext(WindowSizeContext);
  const [isThreadsBarVisible, setIsThreadsBarVisible] = useState(true);

  // toggles visibility between <ChatArea> and <ThreadsBar> components, is called only when the screen withh is <= 576px
  // is passed as a second onclick function to the <SingleThread> as a visibility prop
  const toggleMobileViews = () => {
    setIsThreadsBarVisible((current) => !current);
  };

  const renderHomePage = () => {
    let desktopLayout = (
      <>
        <ThreadsBar />
        <ChatArea />
      </>
    );

    let mobileThreadsScreen = <ThreadsBar visibility={toggleMobileViews} />;
    let mobileChatScreen = <ChatArea visibility={toggleMobileViews} />;

    //allows to toggle visibility between the ThreadsBar and the ChatArea
    let mobileLayout = isThreadsBarVisible
      ? mobileThreadsScreen
      : mobileChatScreen;

    return windowWidth <= 576 ? mobileLayout : desktopLayout;
  };

  return (
    <div className="home-container">
      <Navbar />
      <main className="home-body">{renderHomePage()}</main>
    </div>
  );
};
export default Home;
