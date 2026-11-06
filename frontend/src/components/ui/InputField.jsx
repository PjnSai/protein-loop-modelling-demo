const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  placeholder,
}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
