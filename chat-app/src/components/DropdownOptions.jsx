import "./DropdownOptions.css";
import DropdownOptionsBg from "./shared/DropdownOptionsBg";

const DropdownOptions = ({ options }) => {
  return (
    <DropdownOptionsBg>
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
