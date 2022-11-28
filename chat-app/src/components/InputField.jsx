const InputField = ({ className, id, label, placeholder, type, onChange }) => (
  <>
    {label && <label htmlFor={id}>{capitalizeFirstLetter(label)}</label>}
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  </>
);

function capitalizeFirstLetter(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export default InputField;
