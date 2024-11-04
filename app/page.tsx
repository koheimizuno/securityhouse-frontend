'use client'

import PostSection from '@/views/top/PostSection'
import NewsSection from '@/views/top/NewsSection'
import DocumentSection from '@/views/top/DocumentSection'

export default function Home() {
  return (
    <>
      <section className='bg-bgSemiblue py-8'>
        <PostSection />
      </section>
      <section className='py-12'>
        <NewsSection />
      </section>
      <section className='bg-bgSemiblue py-12'>
        <DocumentSection />
      </section>
    </>
  )
}
