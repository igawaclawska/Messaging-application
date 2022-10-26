import PropTypes from 'prop-types';

const Button = ({ onClick, text, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		{text}
    </button>
  );
}

Button.defaultProps = {
	text: 'Primary Button',
	className: "primaryBtn"
};

// Button.propTypes = {
// 	variant: PropTypes.oneOf(['tertiary', 'secondary', 'primary']),
// 	disabled: PropTypes.bool,
// };

export default Button;