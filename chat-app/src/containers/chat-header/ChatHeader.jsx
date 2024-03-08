import "./ChatHeader.css";
import { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { ChatsContext } from "../../context/ChatsContext";
import Button from "../../components/button/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteChatModal from "../DeleteChatModal";
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu";
import ProfileImage from "../../components/profile-image/ProfileImage";

const ChatHeader = ({ onClick }) => {
  const { data } = useContext(ChatsContext);

  let [user, setUser] = useState({});
  let [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", data.user1?.uid || "")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data().photoURL);
          setUser(doc.data());
          console.log(`retrieved users header ${user}`);
        });
      });
      return () => {
        unsubscribe();
      };
    };
    getUsers();
  }, [data]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleExitChatOnMobile = () => {
    onClick();
  };

  const menuOptions = [
    {
      id: 1,
      label: "Remove chat",
      onClick: handleOpenModal,
      icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
    },
  ];

  return (
    <header className="chat-header">
      <div className="chat-header-wrapper">
        <div onClick={handleExitChatOnMobile} className="back-btn">
          <Button
            className="fixed-btn tertiary with-icon"
            startIcon={<ArrowBackIosIcon />}
          ></Button>{" "}
        </div>

        {data.user1?.displayName && (
          <>
            <ProfileImage src={user.photoURL} className={"small-image"} />
            <span className="chat-header-title">{user.displayName}</span>

            <div className="delete-icon">
              <DropdownMenu menuOptions={menuOptions}>
                <MoreVertIcon className="delete-icon" />
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
      {isModalOpen && <DeleteChatModal setIsOpen={setIsModalOpen} />}
    </header>
  );
};

export default ChatHeader;
