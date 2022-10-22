import PropTypes from 'prop-types';

const Button = ({ onClick, text }) => {
	return (
	<button type="button" className="primaryBtn" onClick={onClick}>
		{text}
    </button>
  );
}

Button.defaultProps = {
	text: 'Primary Button',
};

// Button.propTypes = {
// 	variant: PropTypes.oneOf(['tertiary', 'secondary', 'primary']),
// 	disabled: PropTypes.bool,
// };

export default Button;