import "./SingleThread.css";
import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import ProfileImage from "./ProfileImage";

const SingleThread = ({ onClick, message, className, receiver }) => {
  let [user, setUser] = useState({});
  const { userLogged } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", receiver.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data().photoURL);
          setUser(doc.data());
          console.log(`retrieved users ${user}`);
        });
      });
      return () => {
        unsubscribe();
      };
    };
    userLogged.uid && getUsers();
  }, []);

  return (
    <li className={className} onClick={onClick}>
      <ProfileImage src={user.photoURL} className={"medium-image"} />
      <div className="thread-text-content">
        <p className="single-thread-header">
          <b>{user.displayName}</b>
        </p>
        <p className="single-thread-message">{message}</p>
      </div>
    </li>
  );
};

SingleThread.defaultProps = {
  groupName: "",
  className: "single-thread",
  receiver1: "name1",
  message: "Start conversation with this user...",
};

export default SingleThread;
