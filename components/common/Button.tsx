"use client"

import React from "react"
import Image from "next/image"

import getImageAlt from "@/utils/getImageAlt"

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  value: string
  className?: string
  icon?: string
  outline?: boolean
  size?: "sm" | "md" | "lg"
  spTxtHidden?: boolean
  subIcon?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  className,
  value,
  icon,
  size = "md",
  outline = false,
  spTxtHidden = false,
  subIcon
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border rounded-full 
        ${size === "sm" ? "px-2 py-0" : "py-2"}
        ${size === "md" ? (subIcon ? "ps-8 pe-14" : "px-8") : ""} 
        ${size === "lg" ? (subIcon ? "ps-12 pe-16" : "px-12") : ""} flex flex-row justify-center items-center gap-2
        ${outline ? "border-borderColor" : "border-primary"}
        ${outline ? "bg-[#f0f0f0]" : "bg-primary"}
        ${outline ? "text-txtColor" : "text-white"}
        ${className}
      `}
    >
      {icon && (
        <Image
          src={icon}
          alt={getImageAlt(icon) || ""}
          className={`${size === "md" ? "w-4 h-4" : "w-5 h-5"}`}
          width={16}
          height={16}
        />
      )}
      <span
        className={`${size === "sm" ? "text-sm" : ""}
          ${size === "md" ? "text-sm" : ""}${size === "lg" ? "text-base" : ""} relative font-bold whitespace-nowrap ${
          spTxtHidden ? "hidden md:block" : ""
        }`}
      >
        {value}
        {subIcon && (
          <Image
            src={subIcon}
            alt={getImageAlt(subIcon) || ""}
            width={20}
            height={20}
            className={`${size === "md" ? "w-5 h-5" : "w-6 h-6"} absolute -right-8 top-1/2 -translate-y-1/2`}
          />
        )}
      </span>
    </button>
  )
}

export default Button
