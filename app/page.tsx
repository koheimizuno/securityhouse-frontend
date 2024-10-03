"use client";

import Image from "next/image";
import Link from "next/link";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Button from "@/components/common/Button";
import Container from "@/components/layout/Container";
import Input from "@/components/form/Input";
import RoomCard from "@/components/room/RoomCard";
import DataLink from "@/components/common/DataLink";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import roomData from "@/mockup/roomdata.json";
export default function Home() {
  const handleChange = ({ name, value }: { name: string; value: string }) => {};

  return (
    <div className="bg-white mt-[295.5px] sm:mt-[145.5px] md:mt-[123px]">
      <Breadcrumb />
      <section className="bg-[#f2f2f2]">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 py-6">
            <p className="text-[16px] font-bold">キーワード検索</p>
            <div className="flex items-center">
              <Input
                name="keyword"
                className="lg:w-[400px] rounded-l-full"
                placeholder="ハッシュタグ、アカウント、資料、品番検索"
                onChange={handleChange}
              />
              <Button
                value="検索する"
                onClick={() => {}}
                className="rounded-none rounded-r-full px-4 w-[100px] lg:w-[200px] h-10 md:h-10 border border-primary"
              />
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-bgSemiblue py-8">
        <Container>
          <div className="pb-6 flex items-center gap-2">
            <Image
              src="/images/talk-room.svg"
              alt="talk-room"
              className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]"
              width={25}
              height={25}
            />
            <h2>トークルーム最新の投稿</h2>
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:items-start">
            <ul className="w-full grid grid-cols-4 grid-rows-1 gap-3 lg:grid-cols-1 lg:grid-rows-4 lg:w-[240px]">
              <li className="sm:flex sm:flex-row sm:items-center sm:gap-2 rounded-t-lg bg-primary p-3 lg:px-6 lg:h-[72px] lg:gap-4 lg:rounded-none lg:rounded-l-lg">
                <div className="lg:w-[50px]">
                  <Image
                    src="/images/sh-room-white.svg"
                    alt="sh-room"
                    className="w-[25px] h-[25px] m-auto md:w-[28px] md:h-[28px] lg:m-0 text-primary"
                    width={28}
                    height={28}
                  />
                </div>
                <p className="hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 text-white lg:text-[18px] xl:gap-6">
                  <span>SH会ルーム</span>
                  <Image
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    className="w-[6px] h-[12px] hidden lg:block"
                    width={6}
                    height={12}
                  />
                </p>
              </li>
              <li className="sm:flex sm:flex-row sm:items-center sm:gap-2 rounded-t-lg bg-white p-3 lg:px-6 lg:h-[72px] lg:gap-4 lg:rounded-none lg:rounded-l-lg">
                <div className="lg:w-[50px]">
                  <Image
                    src="/images/work-room-primary.svg"
                    alt="work-room"
                    className="w-[25px] h-[25px] m-auto md:w-[28px] md:h-[28px] lg:m-0"
                    width={28}
                    height={28}
                  />
                </div>
                <p className="hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 lg:text-[18px] xl:gap-6">
                  <span>仕事ルーム</span>
                  <Image
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    className="w-[6px] h-[12px] hidden lg:block"
                    width={6}
                    height={12}
                  />
                </p>
              </li>
              <li className="sm:flex sm:flex-row sm:items-center sm:gap-2 rounded-t-lg bg-white p-3 lg:px-6 lg:h-[72px] lg:gap-4 lg:rounded-none lg:rounded-l-lg">
                <div className="lg:w-[50px]">
                  <Image
                    src="/images/exchange-room-primary.svg"
                    alt="exchange-room"
                    className="w-[25px] h-[25px] m-auto md:w-[28px] md:h-[28px] lg:m-0"
                    width={28}
                    height={28}
                  />
                </div>
                <p className="hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 lg:text-[18px] xl:gap-6">
                  <span>交流ルーム</span>
                  <Image
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    className="w-[6px] h-[12px] hidden lg:block"
                    width={6}
                    height={12}
                  />
                </p>
              </li>
              <li className="sm:flex sm:flex-row sm:items-center sm:gap-2 rounded-t-lg bg-white p-3 lg:px-6 lg:h-[72px] lg:gap-4 lg:rounded-none lg:rounded-l-lg">
                <div className="lg:w-[50px]">
                  <Image
                    src="/images/boss-room-primary.svg"
                    alt="boss-room"
                    className="w-[25px] h-[25px] m-auto md:w-[28px] md:h-[28px] lg:m-0"
                    width={28}
                    height={28}
                  />
                </div>
                <p className="hidden font-bold sm:block lg:flex lg:items-center lg:justify-between lg:w-full lg:gap-2 lg:text-[18px] xl:gap-6">
                  <span>社長室ルーム</span>
                  <Image
                    src="/images/arrow-right.svg"
                    alt="arrow-right"
                    className="w-[6px] h-[12px] hidden lg:block"
                    width={6}
                    height={12}
                  />
                </p>
              </li>
            </ul>
            <div className="w-full bg-primary lg:ps-10 py-7 lg:w-[calc(100%-240px)]">
              <div className="text-right pe-8 mb-6">
                <Link href="#" className="text-white font-bold">
                  SH会トークルーム一覧へ
                </Link>
              </div>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                speed={800}
                loop={true}
                centeredSlides
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
              >
                {roomData.map((room) => (
                  <SwiperSlide key={room.id}>
                    <RoomCard
                      id={room.id}
                      title={room.title}
                      description={room.description}
                      category={room.category}
                      tag={room.tag}
                      likeNum={room.likeNum}
                      commentNum={room.commentNum}
                      user={room.user}
                      updatedAt={room.updatedAt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white py-12">
        <Container>
          <div className="flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-[40px] xl:gap-[96px]">
            <div className="flex flex-col justify-center items-start md:items-center gap-2 md:gap-6 w-full md:w-auto">
              <div className="flex justify-start items-center gap-2">
                <Image
                  src="/images/info-icon.svg"
                  alt="info-icon"
                  width={24}
                  height={24}
                />
                <h2>新着情報</h2>
              </div>
              <Button
                value="一覧を見る"
                onClick={() => {}}
                size="lg"
                subIcon="/images/arrow-right-circle.svg"
                className="hidden md:block h-14 hrounded-full border border-primary"
              />
            </div>
            <div className="w-full md:hidden text-right">
              <a href="#" className="underline font-bold">
                一覧を見る
              </a>
            </div>
            <ul className="flex flex-col items-center w-full h-[500px] md:h-[330px] overflow-y-scroll pr-6">
              <li className="border-b border-colorGray2 py-4 w-full border-t md:border-t-0">
                <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center">
                  <div className="flex justify-between md:justify-start items-center gap-6">
                    <span className="text-xs text-colorGray4 hidden md:block">
                      2024年6月11日 14:30
                    </span>
                    <p className="flex items-center gap-3">
                      <Image
                        src="/images/user-icon-sm.svg"
                        alt="user-icon-sm"
                        width={12}
                        height={12}
                      />
                      <span className="text-xs">山田太郎／所属名</span>
                    </p>
                    <span className="text-sm bg-primary rounded-full px-2 text-white">
                      事務局からのご案内
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-colorGray4 md:hidden">
                      2024年6月11日 14:30
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-colorGray4">
                        ブックマークに追加
                      </span>
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
                  <h3 className="py-4 underline">タイトルタイトルタイトル</h3>
                </a>
                <p className="text-sm line-clamp-1">
                  投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...
                </p>
              </li>
              <li className="border-b border-colorGray2 py-4 w-full">
                <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center">
                  <div className="flex justify-between md:justify-start items-center gap-6">
                    <span className="text-xs text-colorGray4 hidden md:block">
                      2024年6月11日 14:30
                    </span>
                    <p className="flex items-center gap-3">
                      <Image
                        src="/images/user-icon-sm.svg"
                        alt="user-icon-sm"
                        width={12}
                        height={12}
                      />
                      <span className="text-xs">山田太郎／所属名</span>
                    </p>
                    <span className="text-sm bg-primary rounded-full px-2 text-white">
                      事務局からのご案内
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-colorGray4 md:hidden">
                      2024年6月11日 14:30
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-colorGray4">
                        ブックマークに追加
                      </span>
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
                  <h3 className="py-4 underline">タイトルタイトルタイトル</h3>
                </a>
                <p className="text-sm line-clamp-1">
                  投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...
                </p>
              </li>
              <li className="border-b border-colorGray2 py-4 w-full">
                <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center">
                  <div className="flex justify-between md:justify-start items-center gap-6">
                    <span className="text-xs text-colorGray4 hidden md:block">
                      2024年6月11日 14:30
                    </span>
                    <p className="flex items-center gap-3">
                      <Image
                        src="/images/user-icon-sm.svg"
                        alt="user-icon-sm"
                        width={12}
                        height={12}
                      />
                      <span className="text-xs">山田太郎／所属名</span>
                    </p>
                    <span className="text-sm bg-primary rounded-full px-2 text-white">
                      事務局からのご案内
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-colorGray4 md:hidden">
                      2024年6月11日 14:30
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-colorGray4">
                        ブックマークに追加
                      </span>
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
                  <h3 className="py-4 underline">タイトルタイトルタイトル</h3>
                </a>
                <p className="text-sm line-clamp-1">
                  投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ...
                </p>
              </li>
            </ul>
          </div>
        </Container>
      </section>
      <section className="bg-bgSemiblue py-12">
        <Container>
          <div className="flex items-center gap-2">
            <Image
              src="/images/data-icon.svg"
              alt="data-icon"
              className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]"
              width={25}
              height={25}
            />
            <h2>資料集</h2>
          </div>
          <div className="mt-6">
            <h3>営業・事務</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3">
              <DataLink src="/images/note-icon.svg" title="チラシ・提案書" />
              <DataLink src="/images/video-icon.svg" title="動画" />
              <DataLink src="/images/pr-icon.svg" title="販促物" />
              <DataLink src="/images/doc-icon.svg" title="書類関係" />
            </div>
          </div>
          <div className="mt-6">
            <h3>商品・技術</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3">
              <DataLink src="/images/brand-icon.svg" title="SHブランド" />
              <DataLink src="/images/takex-icon.svg" title="TAKEXブランド" />
              <DataLink
                src="/images/security-icon.svg"
                title="セキュリネット"
              />
              <DataLink src="/images/inext-icon.svg" title="i-NEXT" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
