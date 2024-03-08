import "./Button.css";
import LottiePlayer from "../LottiePlayer";

const Button = ({
  children,
  onClick,
  endIcon,
  startIcon,
  className,
  type,
  loading,
}) => {
  let spinnerAnimation = (
    <LottiePlayer src={"spinner.json"} width={"19px"} height={"19px"} />
  );
  return (
    <button type={type} className={className} onClick={onClick}>
      {startIcon}
      {loading ? spinnerAnimation : children}
      {endIcon}
    </button>
  );
};

Button.defaultProps = {
  className: "fixed-btn primary",
  type: "button",
};

export default Button;
