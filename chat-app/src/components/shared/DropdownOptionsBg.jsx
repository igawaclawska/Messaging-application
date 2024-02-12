import "./DropdownOptionsBg.css";

const DropdownOptionsBg = ({ children, isOpen }) => {
  {
    return isOpen && <ul className="dropdown-menu">{children}</ul>;
  }
};

export default DropdownOptionsBg;
