const SecondaryButton = ({ onClick, text }) => {
	return (
	<button type="button" className="secondaryBtn" onClick={onClick}>
		{text}
    </button>
  );
}

SecondaryButton.defaultProps = {
    text: 'Secondary Button'
}

export default SecondaryButton;