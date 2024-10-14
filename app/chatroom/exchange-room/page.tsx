"use client";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import SearchBar from "@/components/common/SearchBar";
import Container from "@/components/layout/Container";
import Category from "@/views/chatroom/Category";
import ExchangeRoomContent from "@/views/chatroom/ExchangeRoomContent";

const ExchangeRoom = () => {
  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container>
        <div className="py-12 flex items-start gap-10">
          <Category />
          <ExchangeRoomContent />
        </div>
      </Container>
    </>
  );
};

export default ExchangeRoom;