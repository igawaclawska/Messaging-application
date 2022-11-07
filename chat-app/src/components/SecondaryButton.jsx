import AddCommentIcon from '@mui/icons-material/AddComment';

const SecondaryButton = ({ onClick, text, icon, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		 {icon} {text} 
    </button>
  );
}

SecondaryButton.defaultProps = {
    text: 'Secondary Button',
    icon: <AddCommentIcon/> ,
    className: "secondaryBtn"
}

export default SecondaryButton;