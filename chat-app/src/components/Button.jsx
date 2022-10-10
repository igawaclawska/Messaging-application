import React from "react";
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
	return (
	<button type="button" onClick={onClick}>
		Whatever
    </button>
  );
}

Button.propTypes = {
	variant: PropTypes.oneOf(['tertiary', 'secondary', 'primary']),
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	variant: 'primary',
};

export default Button;