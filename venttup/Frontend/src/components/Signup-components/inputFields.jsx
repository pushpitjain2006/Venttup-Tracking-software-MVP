export const InputField = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
);

export const SubmitButton = ({ loading, text }) => (
  <button
    type="submit"
    className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
    disabled={loading}
  >
    {text}
  </button>
);
