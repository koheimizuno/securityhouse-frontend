"use client";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import SearchBar from "@/components/common/SearchBar";
import Container from "@/components/layout/Container";
import Category from "@/components/room/Category";
import WorkRoomContent from "@/components/room/WorkRoomContent";

const WorkRoom = () => {
  return (
    <>
      <Breadcrumb />
      <SearchBar />
      <Container>
        <div className="py-12 flex items-start gap-10">
          <Category />
          <WorkRoomContent />
        </div>
      </Container>
    </>
  );
};

export default WorkRoom;
