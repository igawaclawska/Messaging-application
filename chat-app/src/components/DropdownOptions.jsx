import "./DropdownOptions.css";
import DropdownOptionsBg from "./shared/DropdownOptionsBg";

const DropdownOptions = ({ isOpen, options }) => {
  return (
    <DropdownOptionsBg isOpen={isOpen}>
      {options?.map((option) => (
        <li
          key={option.id}
          value={option.id}
          onClick={option.onClick}
          className="menu-item"
        >
          {option.label}
        </li>
      ))}
    </DropdownOptionsBg>
  );
};

export default DropdownOptions;
