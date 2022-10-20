const TertiaryButton = ({ onClick, text }) => {
	return (
	<button type="button" className="tertiaryBtn" onClick={onClick}>
		{text}
    </button>
  );
}

TertiaryButton.defaultProps = {
    text: 'Tertiary Button'
}

export default TertiaryButton;