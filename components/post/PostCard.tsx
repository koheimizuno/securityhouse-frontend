"use client";

import React from "react";
import Image from "next/image";

import Button from "@/components/common/Button";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  tag: string[];
  likeNum: number;
  commentNum: number;
  user: {
    name: string;
    avatar: string;
    company: string;
  };
  updatedAt: string;
}

const PostCard = ({
  id,
  title,
  description,
  category,
  tag,
  likeNum,
  commentNum,
  user,
  updatedAt,
}: PostCardProps) => {
  return (
    <div className="bg-white px-4 py-6 w-[282px] rounded-md">
      <p className="text-xs flex items-center gap-1 mb-3">
        <span className="text-primary">■</span>
        <span>{category}</span>
      </p>
      <ul className="mb-5 flex items-center flex-wrap gap-2">
        {tag.map((tag, id) => (
          <Button
            key={id}
            value={tag}
            size="sm"
            className="text-sm font-bold bg-primary text-white px-2 py-1 rounded-full w-fit"
          />
        ))}
      </ul>
      <a href="#">
        <h3 className="underline truncate text-txtColor">{title}</h3>
      </a>
      <p className="text-sm line-clamp-3">{description}</p>
      <div className="grid grid-cols-2 gap-4 mt-[22px] mb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/thumbs-up.svg"
            alt="thumbs-up"
            width={20}
            height={20}
          />
          <p className="text-sm font-bold text-colorGray4">
            <a href="#">いいね！ </a>
            <span>{likeNum} 件</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/comment-icon.svg"
            alt="comment"
            width={20}
            height={20}
          />
          <p className="text-sm font-bold text-colorGray4">
            <a href="#">コメント</a>
            <span>{commentNum} 件</span>
          </p>
        </div>
      </div>
      <hr className="border-b border-colorGray4" />
      <div className="flex items-center gap-2 mt-4 mb-3">
        <Image
          src="/images/user-icon.svg"
          alt="user-icon"
          width={24}
          height={24}
        />
        <p className="text-sm">
          {user.name}/{user.company}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-colorGray4">{updatedAt}</p>
        <Image
          src="/images/more-icon.svg"
          alt="more-icon"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default PostCard;
