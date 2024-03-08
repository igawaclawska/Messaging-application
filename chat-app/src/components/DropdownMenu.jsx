import { useRef } from "react";
import { useDropdownHandler } from "../hooks/useDropdownHandler";
import DropdownOptions from "./DropdownOptions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "./button/Button";

const DropdownMenu = ({ menuOptions, hasCaret, children }) => {
  const menuRef = useRef(null);

  const { isDropdownOpen, setIsDropdownOpen } = useDropdownHandler(
    false,
    menuRef
  );

  const toggleMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div ref={menuRef}>
      <Button
        type="button"
        className="fixed-btn secondary-white small with-icon"
        onClick={toggleMenu}
      >
        {children}
        {hasCaret === true &&
          (isDropdownOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />)}
      </Button>
      {isDropdownOpen && (
        <DropdownOptions
          setIsDropdownOpen={setIsDropdownOpen}
          isOpen={isDropdownOpen}
          options={menuOptions}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
