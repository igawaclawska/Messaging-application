const TertiaryButton = ({ onClick, text, className }) => {
	return (
	<button type="button" className={className} onClick={onClick}>
		{text}
    </button>
  );
}

TertiaryButton.defaultProps = {
    text: 'Tertiary Button',
    className: 'tertiaryBtn'
}

export default TertiaryButton;