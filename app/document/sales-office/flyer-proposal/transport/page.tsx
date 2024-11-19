'use client'

import { useEffect, useRef, useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocumentCard from '@/views/document/DocumentCard'
import { Image } from '@nextui-org/react'

import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentTransportPage = () => {
  const officeRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef(null)
  const robberyRef = useRef(null)
  const proposalRef = useRef<HTMLDivElement>(null)
  const { session_user_id } = useAuthentication()
  const [businessDocData, setBusinessDocData] = useState<DocumentType[] | null>([])
  const [storeDocData, setStoreDocData] = useState<DocumentType[] | null>([])
  const [robberyDocData, setRobberyDocData] = useState<DocumentType[] | null>([])
  const [proposalDocData, setProposalDocData] = useState<DocumentType[] | null>([])

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>, offset = 150) => {
    if (ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    getDocumentsAction({ type_id: 1, category_id: 14, user_id: session_user_id }).then(data => {
      setBusinessDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '18')
        else return null
      })
      setStoreDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '19')
        else return null
      })
      setRobberyDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '20')
        else return null
      })
      setProposalDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '21')
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-8'>
      <div className='flex items-start gap-10'>
        <ul className='w-[205px] hidden md:block'>
          <li
            className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 cursor-pointer'
            onClick={() => scrollToRef(officeRef)}
          >
            <span className='text-sm'>事務所向け</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li
            className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'
            onClick={() => scrollToRef(storeRef)}
          >
            <span className='text-sm'>店舗向け</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li
            className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'
            onClick={() => scrollToRef(robberyRef)}
          >
            <span className='text-sm'>強盗対策</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li
            className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'
            onClick={() => scrollToRef(proposalRef)}
          >
            <span className='text-sm'>提案書</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
        </ul>
        <div className='w-full md:w-[calc(100%-246px)] flex flex-col gap-8'>
          <PageHeader title='物流・運送業向け' subtitle='資料集' />
          <section className='flex flex-col gap-6' ref={officeRef}>
            <SectionTitle title='事務所向け' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              {businessDocData && businessDocData.length !== 0 ? (
                businessDocData.map((doc, key) => (
                  <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
                ))
              ) : (
                <p className='py-12 text-lg'>表示する資料がありません。</p>
              )}
            </div>
          </section>
          <section className='flex flex-col gap-6' ref={storeRef}>
            <SectionTitle title='店舗向け' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              {storeDocData && storeDocData.length !== 0 ? (
                storeDocData.map((doc, key) => (
                  <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
                ))
              ) : (
                <p className='py-12 text-lg'>表示する資料がありません。</p>
              )}
            </div>
          </section>
          <section className='flex flex-col gap-6' ref={robberyRef}>
            <SectionTitle title='強盗対策' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              {robberyDocData && robberyDocData.length !== 0 ? (
                robberyDocData.map((doc, key) => (
                  <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
                ))
              ) : (
                <p className='py-12 text-lg'>表示する資料がありません。</p>
              )}
            </div>
          </section>
          <section className='flex flex-col gap-6' ref={proposalRef}>
            <SectionTitle title='提案書' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              {proposalDocData && proposalDocData.length !== 0 ? (
                proposalDocData.map((doc, key) => (
                  <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
                ))
              ) : (
                <p className='py-12 text-lg'>表示する資料がありません。</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </Container>
  )
}

export default DocumentTransportPage
