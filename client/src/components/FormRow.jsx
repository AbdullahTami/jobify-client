function FormRow({ type, labelText, defaultValue, name, onChange }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
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
