'use client'

import { usePathname } from 'next/navigation'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/breadcrumb'
import SearchBar from '@/components/common/SearchBar'

import Providers from './providers'
import { isDisplayHeaderPage } from '@/utils/isPublicPage'

const LayoutClient = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const isDisplayHeader = isDisplayHeaderPage(pathname)
  const isHiddenSearchBar = pathname.includes('profile') || pathname.includes('post/bookmark')

  return (
    <Providers>
      {isDisplayHeader ? (
        <>
          <Header />
          <Breadcrumb />
          {!isHiddenSearchBar && <SearchBar />}
          <main>{children}</main>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <main className='mt-20 md:mt-[123px]'>{children}</main>
          <Footer />
        </>
      )}
    </Providers>
  )
}

export default LayoutClient
