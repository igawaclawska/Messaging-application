import PropTypes from 'prop-types';
import AddCommentIcon from '@mui/icons-material/AddComment';


const Button = ({ onClick, text, icon, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		{text} {icon}
    </button>
  );
}

Button.defaultProps = {
	text: 'Primary Button',
	icon: <AddCommentIcon/>,
	className: "primaryBtn"
};

// Button.propTypes = {
// 	variant: PropTypes.oneOf(['tertiary', 'secondary', 'primary']),
// 	disabled: PropTypes.bool,
// };

export default Button;