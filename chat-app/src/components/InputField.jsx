const InputField = ({ className, id, label, placeholder, type, onChange }) => (
  <>
    <div className="input-element">
      {label && <label htmlFor={id}>{capitalizeFirstLetter(label)}</label>}
      <input
        type={type}
        className={className}
        placeholder={placeholder}
      onChange={onChange}
      /></div>
  </>
);

function capitalizeFirstLetter(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export default InputField;
