"use client";

import React, { useState } from "react";

type InputProps = {
  type?: string;
  name: string;
  className?: string;
  placeholder: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
};

const Input = ({
  type = "text",
  name,
  className,
  placeholder,
  onChange,
}: InputProps) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange({ name, value: e.target.value });
  };
  return (
    <label>
      <input
        type={type}
        value={value}
        className={`h-10 border border-colorGray3 focus:outline-none py-2 px-4 rounded-md ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </label>
  );
};

export default Input;
