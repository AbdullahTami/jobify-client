function FormRow({
  type,
  labelText,
  defaultValue,
  name,
  placeholder,
  onChange,
}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue || ""}
        id={name}
        name={name}
        className="form-input"
        required
        onChange={onChange}
      />
    </div>
  );
}
export default FormRow;
