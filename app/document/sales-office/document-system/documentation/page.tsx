'use client'

import { useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import Container from '@/components/layout/Container'
import Category from '@/components/common/Category'
import DocumentationContent from '@/views/document/salesoffice/document-system/DocumentationContent'

const categories = [
  {
    id: '1',
    title: 'セキュリティシステム請負契約書'
  },
  {
    id: '2',
    title: 'ユーザーへの契約時書類'
  }
]

const DocumentDocumentationPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Container className='py-16 flex flex-col gap-12'>
      <PageHeader title='書類' subtitle='資料集' />
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
        <DocumentationContent />
      </div>
    </Container>
  )
}

export default DocumentDocumentationPage
