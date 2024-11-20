'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import Category from '@/components/common/Category'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocumentCard from '@/views/document/DocumentCard'
import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const categories = [
  {
    id: '1',
    title: 'i-NEXT',
    category_id: '34'
  },
  {
    id: '2',
    title: '自主機械警備パネル',
    category_id: '35'
  }
]

const DocumentPhotosPanelPage = () => {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const { session_user_id } = useAuthentication()
  const [photosDocData, setPhotosDocData] = useState<DocumentType[] | null>(null)
  const categoryId = searchParams.get('cat') ? searchParams.get('cat') : '34'

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getDocumentsAction({ type_id: 1, category_id: 26, user_id: session_user_id }).then(data => {
      setPhotosDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id !== 32 && item.category_id !== 33)
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='パネルデザイン一覧' subtitle='資料集' />
      <div className={`inline-block md:hidden ${isOpen && 'change'}`} onClick={handleMenu}>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
      </div>
      <div className='relative flex items-start gap-10'>
        <div
          className={`absolute top-0 left-0 z-10 h-full bg-white shadow-xl rounded-lg md:p-0 md:shadow-none md:relative overflow-hidden ${
            isOpen ? 'max-w-full px-4 py-6 border border-colorGray1 md:border-none' : 'max-w-0 md:max-w-none'
          }`}
        >
          <Category categories={categories} toggleMenu={handleMenu} />
        </div>
        <div className='md:w-[calc(100%-246px)] flex flex-col gap-8'>
          <SectionTitle title='商品展示会' bar={true} divider={true} />
          <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
            {photosDocData && photosDocData.length !== 0 ? (
              photosDocData
                .filter(item => item.category_id === Number(categoryId))
                .map((doc, key) => (
                  <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
                ))
            ) : (
              <p className='py-12 text-lg'>表示する資料がありません。</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default DocumentPhotosPanelPage
