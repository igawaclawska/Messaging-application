import "./DropdownOptions.css";
import DropdownOptionsBg from "../shared/DropdownOptionsBg";

const DropdownOptions = ({ options, setIsDropdownOpen }) => {
  const handleClick = (option) => {
    handleSelectOption(option);
    handleCloseDropdownList();
  };

  const handleSelectOption = (option) => {
    option.onClick();
  };

  const handleCloseDropdownList = () => {
    setIsDropdownOpen(false);
  };

  return (
      <DropdownOptionsBg>
        {options?.map((option) => (
          <li
            key={option.id}
            value={option.id}
            onClick={() => handleClick(option)}
            className="menu-item"
          >
            {option.icon}
            {option.label}
          </li>
        ))}
      </DropdownOptionsBg>
  );
};

export default DropdownOptions;
