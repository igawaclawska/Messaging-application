import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const TertiaryButton = ({ onClick, text, icon, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		{text} {icon}
    </button>
  );
}

TertiaryButton.defaultProps = {
    text: 'Tertiary Button',
    icon: <ArrowBackIosIcon/>,
    className: 'tertiaryBtn'
}

export default TertiaryButton;