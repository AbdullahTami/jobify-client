function FormRow({ type, labelText, defaultValue, name }) {
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
      />
    </div>
  );
}
export default FormRow;
