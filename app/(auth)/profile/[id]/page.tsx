"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import SectionTitle from "@/components/common/SectionTitle";
import AnnounceMdCard from "@/components/announce/AnnounceMdCard";
import PageHeader from "@/components/common/PageHeader";

const Profile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const [tab, setTab] = useState<string>("1");

  const id = params.id;

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setTab(tab);
    }
  }, [searchParams, id]);

  const handleTab = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) {
      router.push(`${pathname}?tab=${value}`);
    }
  };

  return (
    <Container className="py-20">
      <PageHeader title="マイページ" />
      <section className="bg-bgSemiblue ps-9 pe-[60px] py-12 flex justify-between gap-9 mb-[50px]">
        <div>
          <Image
            src="/images/user-icon00.svg"
            alt="user-icon00"
            className="object-contain"
            width={125}
            height={125}
            priority
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">山田太郎／所属名</h2>
              <p className="text-xs">@aaaaaa</p>
            </div>
            <Link href={`/profile/${id}/edit`}>
              <Button value="アカウント設定" />
            </Link>
          </div>
          <p>
            自己紹介が入ります自己紹介が入ります自己紹介が入ります自己紹介が入ります自己紹介が入ります自己紹介が入ります自己紹介が入ります
          </p>
        </div>
      </section>
      <section className="py-12">
        <SectionTitle title="アクティビティ" icon="/images/line-chart.svg" />
      </section>
      <section className="py-12">
        <SectionTitle title="投稿履歴" icon="/images/talk-room.svg" />
        <ul className="flex items-center gap-6 mt-5">
          <li
            className={`px-4 py-2 ${
              tab === "1" ? "bg-primary text-white" : "bg-white text-txtColor"
            }`}
            data-value="1"
            onClick={handleTab}
          >
            投稿
          </li>
          <li className="text-2xl">|</li>
          <li
            className={`px-4 py-2 ${
              tab === "2" ? "bg-primary text-white" : "bg-white text-txtColor"
            }`}
            data-value="2"
            onClick={handleTab}
          >
            コメント
          </li>
          <li className="text-2xl">|</li>
          <li
            className={`px-4 py-2 ${
              tab === "3" ? "bg-primary text-white" : "bg-white text-txtColor"
            }`}
            data-value="3"
            onClick={handleTab}
          >
            いいね
          </li>
          <li className="text-2xl">|</li>
          <li
            className={`px-4 py-2 ${
              tab === "4" ? "bg-primary text-white" : "bg-white text-txtColor"
            }`}
            data-value="4"
            onClick={handleTab}
          >
            ブックマーク
          </li>
        </ul>
        <ul className="flex flex-col gap-6 mt-5">
          <AnnounceMdCard
            id="1"
            userName="山田太郎"
            avatar="/images/user-icon00.svg"
            userCompany="所属名"
            title="タイトルタイトルタイトル"
            description="投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ"
            isBookmarked={false}
            onClickBookmark={() => {}}
            updatedAt="2024年6月11日 14:30"
          />
        </ul>
      </section>
    </Container>
  );
};

export default Profile;