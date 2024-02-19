import "./InputField.css";
import { TextField } from "@mui/material";

const InputField = ({
  value,
  className,
  id,
  label,
  placeholder,
  type,
  onChange,
  onKeyDown,
}) => (
  <div className="input-element">
    <TextField
      sx={{
        "& .MuiInputLabel-root": { color: "var(--grey)" }, //styles the label
        "& .MuiInputLabel-root.Mui-focused": { color: "var(--blue1)" }, //styles the label
        "& .MuiOutlinedInput-root.Mui-focused": {
          "& > fieldset": {
            borderColor: "var(--blue1)",
          },
        },
      }}
      className={className}
      size="small"
      id={id}
      label={label}
      variant="outlined"
      type={type && type}
      value={value && value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
