import { useRef, useEffect, useState } from "react";
import DropdownOptions from "./DropdownOptions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "./Button";

const DropdownMenu = ({ menuOptions, hasCaret, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
