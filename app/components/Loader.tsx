"use client";

import React from "react";

const Loader = () => {
  return (
    <div
      className="
        h-[100vh]
        flex
        flex-col
        justify-center
        items-center"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      <div
        className="
            w-20
            h-20
            border-t-2
            border-b-2
            border-primary
            rounded-full
            animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
