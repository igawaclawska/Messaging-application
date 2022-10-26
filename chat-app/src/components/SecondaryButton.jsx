const SecondaryButton = ({ onClick, text, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		{text}
    </button>
  );
}

SecondaryButton.defaultProps = {
    text: 'Secondary Button',
    className: "secondaryBtn"
}

export default SecondaryButton;