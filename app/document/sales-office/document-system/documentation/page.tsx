'use client'

import { useEffect, useRef, useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import Container from '@/components/layout/Container'
import Image from 'next/image'
import SectionTitle from '@/components/common/SectionTitle'
import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'
import DocumentCard from '@/views/document/DocumentCard'

const DocumentDocumentationPage = () => {
  const officeRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef(null)
  const robberyRef = useRef(null)
  const { session_user_id } = useAuthentication()
  const [securityDocData, setSecurityDocData] = useState<DocumentType[] | null>(null)
  const [contractDocData, setContractDocData] = useState<DocumentType[] | null>(null)
  const [maintenanceDocData, setMaintenanceDocData] = useState<DocumentType[] | null>(null)

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
    getDocumentsAction({ type_id: 1, category_id: 12, user_id: session_user_id }).then(data => {
      setSecurityDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '42')
        else return null
      })
      setContractDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '43')
        else return null
      })
      setMaintenanceDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '44')
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-12'>
      <div className='flex items-start gap-10'>
        <ul className='w-[205px] hidden md:block'>
          <li
            className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 cursor-pointer'
            onClick={() => scrollToRef(officeRef)}
          >
            <span className='text-sm'>セキュリティシステム請負契約書</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li
            className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'
            onClick={() => scrollToRef(storeRef)}
          >
            <span className='text-sm'>ユーザーへの契約時書類</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li
            className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'
            onClick={() => scrollToRef(robberyRef)}
          >
            <span className='text-sm'>保守・メンテナンス</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
        </ul>
        <div className='w-full md:w-[calc(100%-246px)] flex flex-col gap-8'>
          <PageHeader title='書類' subtitle='資料集' />
          <section className='flex flex-col gap-6' ref={officeRef}>
            <SectionTitle title='セキュリティシステム請負契約書' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              {securityDocData && securityDocData.length !== 0 ? (
                securityDocData.map((doc, key) => (
                  <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
                ))
              ) : (
                <p className='py-12 text-lg'>表示する資料がありません。</p>
              )}
            </div>
          </section>
          <section className='flex flex-col gap-6' ref={storeRef}>
            <SectionTitle title='ユーザーへの契約時書類' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              {contractDocData && contractDocData.length !== 0 ? (
                contractDocData.map((doc, key) => (
                  <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
                ))
              ) : (
                <p className='py-12 text-lg'>表示する資料がありません。</p>
              )}
            </div>
          </section>
          <section className='flex flex-col gap-6' ref={robberyRef}>
            <SectionTitle title='保守・メンテナンス' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              {maintenanceDocData && maintenanceDocData.length !== 0 ? (
                maintenanceDocData.map((doc, key) => (
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

export default DocumentDocumentationPage
