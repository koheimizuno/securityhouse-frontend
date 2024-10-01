"use client";

import Image from "next/image";
import Button from "@/app/components/Button";
import { useState } from "react";

const Header = () => {
  const [isHamburger, setIsHamburger] = useState(false);
  const handleHamburger = () => {
    setIsHamburger(!isHamburger);
  };
  return (
    <header className="fixed top-0 w-full bg-white z-10 shadow-sm">
      <nav className="relative px-[27px] py-4 border-b-[1px]">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <div className="flex flex-row items-center gap-2">
            <Image src="/images/logo.svg" alt="Logo" width={217} height={40} />
            <p className="text-[15px] font-bold color-[#333]">
              <a
                href=""
                target="_blank"
                className="hidden md:block text-txtColor"
              >
                SH会員専用ページ
              </a>
            </p>
          </div>
          <div
            className={`absolute top-[73px] right-0 z-20 w-full bg-white flex-col gap-6 p-8 sm:static sm:top-0 sm:right-0 sm:p-0 sm:w-auto sm:max-h-full flex sm:flex-row items-center sm:gap-2 transition-all duration-300 ease-in-out ${
              isHamburger
                ? "max-h-[1000px] overflow-visible"
                : "max-h-0 overflow-hidden p-0"
            }`}
          >
            <a href="" target="_blank" className="text-txtColor sm:hidden">
              <Button
                onClick={() => {}}
                value="SH会員専用ページ"
                outline={true}
                spTxtHidden={true}
                icon="/images/bookmark-vector.svg"
              />
            </a>
            <Button
              onClick={() => {}}
              value="ブックマーク"
              outline={true}
              spTxtHidden={true}
              icon="/images/bookmark-vector.svg"
            />
            <Button
              onClick={() => {}}
              value="マイページ"
              outline={false}
              spTxtHidden={true}
              icon="/images/user-vector.svg"
            />
          </div>
          <div
            className={`${isHamburger ? "change" : ""} sm:hidden`}
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
