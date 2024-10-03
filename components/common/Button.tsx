"use client";

import React from "react";
import useImageAlt from "@/hooks/useImageAlt";
import Image from "next/image";

interface ButtonProps {
  value: string;
  className?: string;
  icon?: string;
  outline?: boolean;
  size?: "md" | "lg";
  spTxtHidden?: boolean;
  subIcon?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  value,
  icon,
  size = "md",
  outline = false,
  spTxtHidden = false,
  subIcon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`border rounded-full ${
        size === "md"
          ? subIcon
            ? "ps-8 pe-14"
            : "px-8"
          : subIcon
          ? "ps-12 pe-16"
          : "px-12"
      }  md:py-2 flex flex-row justify-center items-center gap-2
        ${outline ? "border-borderColor" : "border-primary"}
        ${outline ? "bg-[#f0f0f0]" : "bg-primary"}
        ${outline ? "text-txtColor" : "text-white"}
        ${className}
      `}
    >
      {icon && (
        <Image
          src={icon}
          alt={useImageAlt(icon) || ""}
          width={16}
          height={16}
        />
      )}
      <span
        className={`${
          size === "md" ? "text-[14px]" : "text-[16px]"
        } relative font-bold whitespace-nowrap ${
          spTxtHidden ? "hidden md:block" : ""
        }`}
      >
        {value}
        {subIcon && (
          <Image
            src={subIcon}
            alt={useImageAlt(subIcon) || ""}
            width={16}
            height={16}
            className="absolute -right-8 top-1/2 -translate-y-1/2"
          />
        )}
      </span>
    </button>
  );
};

export default Button;
