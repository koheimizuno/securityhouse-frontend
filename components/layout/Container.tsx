"use client";
import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
