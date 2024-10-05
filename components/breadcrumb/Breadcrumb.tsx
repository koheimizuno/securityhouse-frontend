"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/Container";

const Breadcrumb = () => {
  const pathname = usePathname();

  return (
    <Container>
      <div className="py-3 px-4 md:px-[60px] text-xs flex items-center gap-2">
        <Image
          src="/images/home-icon.svg"
          alt="breadcrumb"
          className="w-[10px] h-[10px]"
          width={10}
          height={10}
        />
        <span>TOP</span>
      </div>
    </Container>
  );
};

export default Breadcrumb;
