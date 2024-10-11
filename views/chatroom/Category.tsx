"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ROOM_CATEGORY } from "@/utils/constants";
import getImageAlt from "@/utils/getImageAlt";
import postCategory from "@/mockup/postCategory.json";

const Category = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [cat, setCat] = useState("all");

  useEffect(() => {
    const catQuery = searchParams.get("cat");
    if (catQuery) {
      setCat(catQuery);
    }
  }, [searchParams]);

  const handleCategory = (segment: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("cat", segment);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="w-[206px] flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">カテゴリ</h4>
        <ul className="flex flex-col gap-2">
          {postCategory.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 text-sm rounded-full ps-5 pe-2 py-2 cursor-pointer ${
                cat === item.segment && "bg-primary text-white"
              }`}
              onClick={() => handleCategory(item.segment)}
            >
              <Image
                src={
                  cat === item.segment
                    ? "/images/arrow-right-white.svg"
                    : "/images/arrow-right.svg"
                }
                alt={cat === item.segment ? "arrow-right-white" : "arrow-right"}
                className="w-[6px] h-[12px] hidden lg:block"
                width={6}
                height={12}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">トークルーム</h4>
        <ul className="w-full md:w-auto grid grid-cols-4 grid-rows-1 gap-3 lg:grid-cols-1 lg:grid-rows-4">
          {ROOM_CATEGORY.map((item, index) => (
            <li
              key={index}
              className={`border flex items-center p-3 lg:px-6 lg:h-[72px] rounded-xl cursor-pointer shadow-lg transition-all duration-500 ${
                pathname.includes(item.href)
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-colorGray1 hover:bg-hoverPrimary hover:border-hoverPrimary"
              }`}
            >
              <Link
                href={item.href}
                className="sm:flex sm:flex-row sm:items-center sm:gap-2 lg:gap-2"
              >
                <div className="lg:w-[50px]">
                  <Image
                    src={
                      pathname.includes(item.href) ? item.icon[1] : item.icon[0]
                    }
                    alt={
                      pathname.includes(item.href)
                        ? getImageAlt(item.icon[1]) || ""
                        : getImageAlt(item.icon[0]) || ""
                    }
                    className="w-[23px] h-[23px] m-auto lg:m-0 text-primary"
                    width={28}
                    height={28}
                  />
                </div>
                <p
                  className={`hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 ${
                    pathname.includes(item.href) && "text-white"
                  } xl:gap-2`}
                >
                  <span dangerouslySetInnerHTML={{ __html: item.title }}></span>
                  <Image
                    src={
                      pathname.includes(item.href)
                        ? "/images/arrow-right-white.svg"
                        : "/images/arrow-right.svg"
                    }
                    alt={
                      pathname.includes(item.href)
                        ? "arrow-right-white"
                        : "arrow-right"
                    }
                    className="w-[6px] h-[12px] hidden lg:block"
                    width={6}
                    height={12}
                  />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
