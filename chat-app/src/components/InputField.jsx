import "./InputField.css";
import { TextField } from "@mui/material";

// const isMobile = () => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   );
// };

const InputField = ({
  value,
  className,
  id,
  label,
  placeholder,
  type,
  onChange,
  onKeyDown,
  error,
  helperText,
  onBlur,
}) => (
  <div className="input-element">
    <TextField
      sx={{
        "& .MuiInputLabel-root": { color: "var(--grey)" }, //styles the label
        "& .MuiInputLabel-root.Mui-focused:not(.Mui-disabled, .Mui-error)": {
          color: "var(--blue1)",
        }, //styles the label
        "& .MuiOutlinedInput-root.Mui-focused:": {
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
      error={error ? true : false}
      helperText={helperText && helperText}
      onBlur={onBlur && onBlur}
    />
  </div>
);

export default InputField;
