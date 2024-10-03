"use client";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-0">
      {children}
    </div>
  );
};

export default Container;
