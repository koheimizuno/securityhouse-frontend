"use client";

import { useState } from "react";

import Container from "@/components/layout/Container";
import Input from "@/components/form/InputText";
import Button from "@/components/common/Button";

const SearchBar = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
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
  );
};

export default SearchBar;
