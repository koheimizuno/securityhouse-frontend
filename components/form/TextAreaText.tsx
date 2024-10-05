"use client";

import React, { useState } from "react";
import Image from "next/image";

type InputProps = {
  name: string;
  className?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaText = ({
  name,
  className,
  placeholder,
  onChange,
}: InputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <textarea
      name={name}
      value={value}
      rows={5}
      className={`w-full border border-colorGray3 focus:outline-none py-2 px-4 rounded-md ${className}`}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default TextAreaText;
