import React from "react";

export default function InputField({
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon: Icon,
  onIconClick,
  error = false,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={` 
          p-4 bg-transparent rounded text-sm font-medium w-full text-white placeholder-gray-400
          border focus:outline-none transition-all duration-200
          ${error ? "border-red-500" : "border-gray-500 focus:border-gray-200"}
          max-sm:p-5 max-sm:text-base
        `}
      />

      {Icon && (
        <button
          type="button"
          onClick={onIconClick}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
        >
          <Icon size={22} />
        </button>
      )}
    </div>
  );
}
