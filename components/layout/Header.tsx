"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/common/Button";

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
            <Link href="/">
              <Image
                src="/images/logo.svg"
                className="w-[217px] h-[40px]"
                alt="Logo"
                width={217}
                height={40}
              />
            </Link>
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
              className="w-[200px] h-10"
              icon="/images/bookmark-icon-black.svg"
            />
            <a href="/profile/1">
              <Button
                onClick={() => {}}
                value="マイページ"
                outline={false}
                className="w-[200px] h-10"
                icon="/images/user-icon.svg"
              />
            </a>
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
      <ul className="sm:grid sm:grid-cols-4 bg-primary">
        <li className="border-b sm:border-r border-colorGray1">
          <a
            href="#"
            className="flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]"
          >
            トークルーム
          </a>
        </li>
        <li className="border-b sm:border-r border-colorGray1">
          <a
            href="#"
            className="flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]"
          >
            お知らせ
          </a>
        </li>
        <li className="border-b sm:border-r border-colorGray1">
          <a
            href="#"
            className="flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]"
          >
            資料集
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex justify-center items-center py-[13px] font-bold text-colorGray1 hover:bg-[#003d8a]"
          >
            SH会情報
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;