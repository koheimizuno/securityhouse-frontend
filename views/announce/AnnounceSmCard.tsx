"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";

interface AnnounceSmCardProps {
  userName: string;
  userCompany: string;
  title: string;
  description: string;
  isBookmarked: boolean;
  onClickBookmark: () => void;
  updatedAt: string;
}

const AnnounceSmCard = ({
  userName,
  userCompany,
  title,
  description,
  isBookmarked,
  onClickBookmark,
  updatedAt,
}: AnnounceSmCardProps) => {
  return (
    <li className="border-b border-colorGray2 py-4 w-full border-t md:border-t-0">
      <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between md:justify-start items-center gap-6">
          <span className="text-xs text-colorGray4 hidden md:block">
            {updatedAt}
          </span>
          <p className="flex items-center gap-3">
            <Image
              src="/images/user-icon-sm.svg"
              alt="user-icon-sm"
              width={12}
              height={12}
            />
            <span className="text-xs">
              {userName}／{userCompany}
            </span>
          </p>
          <Button
            value="事務局からのご案内"
            size="sm"
            className="text-sm font-bold bg-primary text-white px-2 py-1 rounded-full w-fit"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-colorGray4 md:hidden">{updatedAt}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-colorGray4">ブックマークに追加</span>
            <a href="#">
              <Image
                src="/images/bookmark-icon-gray.svg"
                alt="bookmark-icon-gray"
                width={12}
                height={12}
              />
            </a>
          </div>
        </div>
      </div>
      <a href="#">
        <h3 className="py-4 underline">{title}</h3>
      </a>
      <p className="text-sm line-clamp-1">{description}</p>
    </li>
  );
};

export default AnnounceSmCard;
