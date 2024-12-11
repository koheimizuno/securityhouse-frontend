'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/react';

interface ButtonSetProps {
  onSearchSubmit?: (keyword: string) => void; // 検索ロジックを親から渡す
  links?: { label: string; href: string }[]; // 動的なリンク設定
}

const ButtonSet: React.FC<ButtonSetProps> = ({
  onSearchSubmit = (keyword) => console.log(`検索: ${keyword}`), // デフォルト動作
  links = [
    { label: 'CSVインポート', href: '/import' },
    { label: '新規登録', href: '/create' },
  ],
}) => {
  const pathname = usePathname();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get('keyword') as string;
    onSearchSubmit(keyword);
  };

  return (
    <div className="mb-4 flex justify-end items-center gap-2">
      {/* 検索フォーム */}
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          name="keyword"
          className="bg-white lg:w-[200px] rounded-l-full w-full h-10 bg-colorGray1 border border-colorGray2 focus:outline-none py-2 px-4 rounded-md"
          placeholder="検索"
        />
        <Button
          type="submit"
          color="primary"
          className="rounded-none rounded-r-full px-4 w-[100px] lg:w-[70px] h-10 border border-primary"
        >
          検索
        </Button>
      </form>
      {/* 動的リンク */}
      {links.map((link) => (
        <Link key={link.href} href={`${pathname}${link.href}`}>
          <Button className="rounded-full" color="primary">
            {link.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ButtonSet;
