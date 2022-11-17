const InputField = ({ className, id, label, placeholder, type, onChange, onKeyDown }) => (
  <>
    <div className="input-element">
      {label && <label htmlFor={id}>{capitalizeFirstLetter(label)}</label>}
      <input
        type={type}
        className={className}
        placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      /></div>
  </>
);

function capitalizeFirstLetter(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export default InputField;
