export default function InputBar({ placeholder, type, name, onChange, value }) {
  return (
    <input
      type={type}
      name={name}
      required={true}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="bg-neutral-900 border border-neutral-800 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-600 focus:outline-none px-4 rounded-lg w-full transition-all duration-200"
    />
  );
}