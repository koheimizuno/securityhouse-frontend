"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Button from "@/components/common/Button";
import Input from "@/components/form/InputText";
import PostCard from "@/components/post/PostCard";
import DataLink from "@/components/common/DataLink";
import SectionTitle from "@/components/common/SectionTitle";
import AnnounceSmCard from "@/components/announce/AnnounceSmCard";
import TabVertical from "@/components/common/TabVertical";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import roomData from "@/mockup/roomdata.json";
import { ROOM_CATEGORY } from "@/utils/constants";

export default function Home() {
  const searchParams = useSearchParams();
  const rootCat = searchParams.get("room_cat");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <>
      <Breadcrumb />
      <section className="bg-[#f2f2f2]">
        <Container>
          <h1 className="text-center text-2xl font-bold hidden">
            Security House
          </h1>
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
          <SectionTitle
            title="トークルーム最新の投稿"
            icon="/images/talk-room.svg"
          />
          <div className="flex flex-col items-center mt-6 lg:flex-row lg:items-start">
            <TabVertical queryKey="room_cat" roomCat={ROOM_CATEGORY}>
              <div className="w-full lg:w-[calc(100%-240px)] bg-primary lg:ps-10 py-7 shadow-lg rounded-xl rounded-tl-none">
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
                  navigation={{
                    nextEl: ".arrow-right",
                    prevEl: ".arrow-left",
                  }}
                >
                  {roomData.map((room) => (
                    <SwiperSlide key={room.id}>
                      <PostCard
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
            </TabVertical>
          </div>
        </Container>
      </section>
      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-[40px] xl:gap-[96px]">
            <div className="flex flex-col justify-center items-start md:items-center gap-2 md:gap-6 w-full md:w-auto">
              <SectionTitle title="新着情報" icon="/images/info-icon.svg" />
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
            <ul className="secondary-scroll flex flex-col items-center w-full h-[500px] md:h-[330px] overflow-y-scroll pr-6">
              <AnnounceSmCard
                userName="山田太郎"
                userCompany="所属名"
                title="タイトルタイトルタイトル"
                description="投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ..."
                isBookmarked={false}
                onClickBookmark={() => {}}
                updatedAt="2024年6月11日 14:30"
              />
              <AnnounceSmCard
                userName="山田太郎"
                userCompany="所属名"
                title="タイトルタイトルタイトル"
                description="投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ..."
                isBookmarked={false}
                onClickBookmark={() => {}}
                updatedAt="2024年6月11日 14:30"
              />
              <AnnounceSmCard
                userName="山田太郎"
                userCompany="所属名"
                title="タイトルタイトルタイトル"
                description="投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投稿の内容が入ります投テ..."
                isBookmarked={false}
                onClickBookmark={() => {}}
                updatedAt="2024年6月11日 14:30"
              />
            </ul>
          </div>
        </Container>
      </section>
      <section className="bg-bgSemiblue py-12">
        <Container>
          <SectionTitle title="資料集" icon="/images/data-icon.svg" />
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
    </>
  );
}
