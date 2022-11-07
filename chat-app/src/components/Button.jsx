const Button = ({ onClick, text, icon, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		{icon} {text} 
    </button>
  );
}

Button.defaultProps = {
	text: 'Button',
	className: "fixed-btn primary"
};

export default Button;