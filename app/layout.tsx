import type { Metadata } from "next";
import ClientOnly from "@/components/layout/ClientOnly";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Security House",
  description: "Portal website forSecurity House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ClientOnly>
          <Header />
          <main className="mt-[300px] sm:mt-[145px] md:mt-[123px]">
            {children}
          </main>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}
