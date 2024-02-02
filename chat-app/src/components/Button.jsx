import "./Button.css"

const Button = ({ onClick, text, icon, className, imageSource, type}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {imageSource && <img className="profile-img" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />}
      {text}
      {icon}
    </button>
  );
};

Button.defaultProps = {
  text: "Button",
  className: "fixed-btn primary",
  type: "button",
};

export default Button;
