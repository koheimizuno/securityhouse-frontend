"use client";

import React from "react";
import useImageAlt from "../hooks/useImageAlt";

interface ButtonProps {
  value: string;
  className?: string;
  icon?: string;
  outline?: boolean;
  spTxtHidden?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  value,
  icon,
  outline = false,
  spTxtHidden = false,
}) => {
  const alt = icon ? useImageAlt(icon) : undefined;
  return (
    <button
      onClick={onClick}
      className={`border rounded-full w-[200px] h-[40px] md:w-auto md:h-auto md:px-8 md:py-2 flex flex-row justify-center items-center gap-2
        ${outline ? "border-borderColor" : "border-primary"}
        ${outline ? "bg-[#f0f0f0]" : "bg-primary"}
        ${outline ? "text-txtColor" : "text-white"}
        ${className}
      `}
    >
      {icon && <img src={icon} alt={alt} height={16} />}
      <span
        className={`text-[14px] font-bold whitespace-nowrap ${
          spTxtHidden ? "hidden md:block" : ""
        }`}
      >
        {value}
      </span>
    </button>
  );
};

export default Button;
