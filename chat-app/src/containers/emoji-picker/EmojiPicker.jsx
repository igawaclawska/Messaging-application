import "./EmojiPicker.css"
import { useRef } from "react";
import { useDropdownHandler } from "../../hooks/useDropdownHandler";
import EmojiPicker from "emoji-picker-react";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";

const EmojiPickerDropdown = ({ setText }) => {
  const pickerRef = useRef(null);
  const { isDropdownOpen, setIsDropdownOpen } = useDropdownHandler(
    false,
    pickerRef
  );

  const onEmojiClick = (event) => {
    setText((prevInput) => prevInput + event.emoji);
  };

  const handleClick = (e) => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="picker-container" ref={pickerRef}>
      <SentimentSatisfiedAltRoundedIcon className="icon-button" onClick={handleClick} />

      <div className="emoji-picker-wrapper">
        {isDropdownOpen && (
          <EmojiPicker
            pickerStyle={{ width: "100%" }}
            onEmojiClick={onEmojiClick}
          />
        )}
      </div>
    </div>
  );
};

export default EmojiPickerDropdown;
