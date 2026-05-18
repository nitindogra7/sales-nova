import { useState } from "react";
import InputBar from "./inputBar";

export default function AuthContainer({
  heading,
  defineText,
  highlightText,
  buttonName,
  anchorTagName,
  fields,
  onSubmitAction
}) {
  const [input, setInput] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmitAction(input);
    setInput({});
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="px-8 z-30 py-10 w-85 absolute md:w-full md:max-w-md font-inter">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold font-serif leading-tight text-white mb-1">{heading}</h1>
        <p className="text-sm text-neutral-500 text-center">
          {defineText}
          <span className="text-neutral-300">{highlightText}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        {fields.map((field, index) => (
          <div key={index} className="w-full">
            <label className="block text-sm mb-1.5 mt-4 text-neutral-300">
              {field.label}
            </label>
            <InputBar
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
              name={field.name}
              value={input[field.name] || ""}
            />
          </div>
        ))}

        <div className="flex flex-col items-center gap-3 mt-7">
          <button
            type="submit"
            className="bg-white hover:bg-neutral-100 transition-all duration-200 text-sm font-semibold py-3 rounded-lg w-full text-black tracking-wide"
          >
            {buttonName}
          </button>

          <div className="text-xs text-neutral-500 flex gap-1.5 pt-1">
            <p>
              {heading === "Login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <a className="text-neutral-300 cursor-pointer hover:text-white hover:underline transition-colors duration-200">
              {anchorTagName}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}