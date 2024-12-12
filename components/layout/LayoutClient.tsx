'use client'

import { usePathname } from 'next/navigation'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/breadcrumb'
import SearchBar from '@/components/common/SearchBar'

import Providers from './providers'
import { isDisplayHeaderPage, isUserPage } from '@/utils/isPublicPage'

const LayoutClient = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const isDisplayHeader = isDisplayHeaderPage(pathname)

  const isUser = isUserPage(pathname)

  return (
    <Providers>
      {isDisplayHeader ? (
        <>
          <Header />

          {isUser && <Breadcrumb />}
          {!pathname.includes('profile') && isUser && <SearchBar />}

          <main>{children}</main>
          {isUser && <Footer />}
        </>
      ) : (
        <>
          <Header />
          <main className='mt-20 md:mt-[123px]'>{children}</main>
          {isUser && <Footer />}
        </>
      )}
    </Providers>
  )
}

export default LayoutClient
