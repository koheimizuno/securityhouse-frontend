"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/layout/Container";
import { getBreadcrumbs } from "@/utils/getBreadcrumbs";

const Breadcrumb = () => {
  const pathName = getBreadcrumbs(usePathname());

  return (
    <Container>
      <div className="py-3 px-4 md:px-[60px] text-xs flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/home-icon.svg"
            alt="breadcrumb"
            className="w-[10px] h-[10px]"
            width={10}
            height={10}
          />
          <span>TOP</span>
        </Link>
        <Image
          src="/images/arrow-right-gray.svg"
          alt="arrow-right-gray"
          className="w-[10px] h-[10px]"
          width={4}
          height={8}
        />
        {pathName.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.validPage ? (
              <Link href={item.href} key={index}>
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index !== pathName.length - 1 && (
              <Image
                src="/images/arrow-right-gray.svg"
                alt="arrow-right-gray"
                className="w-[10px] h-[10px]"
                width={4}
                height={8}
              />
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Breadcrumb;
