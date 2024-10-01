"use client";

import Image from "next/image";
import Button from "@/app/components/Button";
import { useState } from "react";

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };
  return (
    <header className="fixed top-0 w-full bg-white z-10 shadow-sm">
      <nav className="relative px-4 sm:px-[27px] py-4 border-b-[1px]">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <div className="flex flex-col items-start gap-0 md:flex-row md:items-center md:gap-2">
            <Image src="/images/logo.svg" alt="Logo" width={217} height={40} />
            <p className="text-[15px] font-bold text-[#333] ps-2 md:ps-0">
              SH会員専用ページ
            </p>
          </div>
          <div
            className={`absolute top-[95.5px] right-0 z-20 w-full bg-white shadow-md flex-col gap-6 sm:static sm:shadow-none sm:top-0 sm:right-0 sm:w-auto sm:max-h-full flex sm:flex-row items-center sm:gap-2 transition-all duration-300 ease-in-out ${
              isHamburgerOpen
                ? "max-h-[1000px] overflow-visible py-8"
                : "max-h-0 overflow-hidden"
            }`}
          >
            <Button
              onClick={() => {}}
              value="ブックマーク"
              outline={true}
              icon="/images/bookmark-vector.svg"
            />
            <Button
              onClick={() => {}}
              value="マイページ"
              outline={false}
              icon="/images/user-vector.svg"
            />
          </div>
          <div
            className={`${isHamburgerOpen ? "change" : ""} sm:hidden`}
            onClick={handleHamburger}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
