import "./Button.css";

const Button = ({ children, onClick, endIcon, startIcon, className, type }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

Button.defaultProps = {
  className: "fixed-btn primary",
  type: "button",
};

export default Button;
