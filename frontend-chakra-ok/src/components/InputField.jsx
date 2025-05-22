
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default InputField;
