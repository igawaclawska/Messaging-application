import "./CreateChatModal.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  collection,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import UserInfo from "../../components/user-info/UserInfo";
import Button from "../../components/button/Button";
import InputField from "../../components/input-field/InputField";
import Modal from "../../components/shared/Modal";
import LottiePlayer from "../../components/lottie-player/LottiePlayer";

const MessageModal = ({ show }) => {
  const [usersSelected, setUserSelected] = useState();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  // const [error, setError] = useState(false);
  const { userLogged } = useContext(AuthContext);
  const [isActive, setIsActive] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = () => {
      const q = query(
        collection(db, "users"),
        where("uid", "!=", userLogged.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
        setUsers(fetchedUsers);
      });
      return () => {
        unsubscribe();
      };
    };
    userLogged.uid && getUsers();
  }, []);

  useEffect(() => {
    console.log("new state", usersSelected);
  }, [usersSelected]);

  const handleSetFilter = (e) => {
    let filter = e.target.value;
    setFilter(filter);
  };

  const usersFiltered = users.filter(
    (user) =>
      user.displayName.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const createChat = async () => {
    setLoading(true);
    const chatsId =
      userLogged.uid > usersSelected.uid
        ? userLogged.uid + usersSelected.uid
        : usersSelected.uid + userLogged.uid;
    try {
      const res = await getDoc(doc(db, "chats", chatsId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", chatsId), { messages: [] });
        await updateDoc(doc(db, "userChats", userLogged.uid), {
          [chatsId + ".messageReceiver"]: {
            uid: usersSelected.uid,
            displayName: usersSelected.displayName,
            email: usersSelected.email,
          },
          [chatsId + ".sender"]: {
            name: userLogged.displayName,
          },
        });
        await updateDoc(doc(db, "userChats", usersSelected.uid), {
          [chatsId + ".messageReceiver"]: {
            uid: userLogged.uid,
            displayName: userLogged.displayName,
            email: userLogged.email,
          },
          [chatsId + ".sender"]: {
            name: usersSelected.displayName,
          },
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUserSelected(null);
    }
  };

  const handleChatCreation = async () => {
    if (usersSelected.length !== 0) {
      await createChat();
      show(false);
    }
  };
  const handleSelect = (user) => {
    setUserSelected(user);
    setIsActive(user);
    console.log(
      "search array after selection:" + JSON.stringify(usersSelected)
    );
  };

  return (
    <Modal setIsOpen={show}>
      <div className="create-chat-header">
        <h3>Create a new chat</h3>
      </div>
      <InputField
        onChange={handleSetFilter}
        type={"search"}
        label={"Search user"}
        autoComplete="off"
      />
      {/* The class 'create-message-body' seems to not extst */}
      <div className="create-message-body">
        <p className="create-chat-instruction"> Available users:</p>
        <div className="add-receivers">
          <ul className="search-list">

            {usersFiltered.length !== 0 ? (
              usersFiltered.map((user, idx) => (
                <UserInfo
                  className={`user-info ${isActive === user && "active"}`}
                  onClick={() => handleSelect(user)}
                  key={idx}
                  user={user}
                  idx={idx}
                />
              ))
            ) : (
              <div className="search-list-no-results">
                <LottiePlayer
                  src={"user-not-found.json"}
                  height={"170px"}
                  width={"200px"}
                  speed={0.7}
                />
                User not found
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="create-message-footer">
        <Button
          className="fluid-btn secondary no-margin"
          onClick={() => show(false)}
        >
          Cancel
        </Button>
        <Button
          className="fluid-btn primary no-margin"
          onClick={() => handleChatCreation()}
          loading={loading}
        >
          Create chat
        </Button>
      </div>
    </Modal>
  );
};

export default MessageModal;
