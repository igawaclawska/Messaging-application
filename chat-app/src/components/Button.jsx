import AddCommentIcon from '@mui/icons-material/AddComment';


const Button = ({ onClick, text, icon, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		{icon} {text} 
    </button>
  );
}

Button.defaultProps = {
	text: 'Primary Button',
	icon: <AddCommentIcon/>,
	className: "primaryBtn"
};

export default Button;