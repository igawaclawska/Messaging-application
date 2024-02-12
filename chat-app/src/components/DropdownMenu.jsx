import { useRef, useEffect } from "react";
import DropdownOptions from "./DropdownOptions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DropdownMenu = ({
  isDropdownOpen,
  setIsDropdownOpen,
  menuOptions,
  toggleMenu,
  imgSrc,
  btnText,
  btnType,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderButton = () => {
    let btnWithImage = (
      <button
        type="button"
        className={"fixed-btn secondary-white small with-icon"}
        onClick={toggleMenu}
      >
        <img
          className="profile-img"
          src={imgSrc || "blank-profile-picture.png"}
          alt=""
        />
        {btnText || "User"}
        {isDropdownOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </button>
    );

    let iconBtn = <MoreVertIcon className="delete-icon" onClick={toggleMenu} />;

    if (btnType === "icon") {
      return iconBtn;
    } else return btnWithImage;
  };

  return (
    <div ref={menuRef}>
      {renderButton()}
      <DropdownOptions isOpen={isDropdownOpen} options={menuOptions} />
    </div>
  );
};

export default DropdownMenu;
