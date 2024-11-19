'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { useAuthentication } from '@/hooks/AuthContext'
import { getDocumentsAction } from '@/actions/documentAction'
import { DocumentType } from '@/types/documentType'

const DocumentVideoOrderFormPage = () => {
  const { session_user_id } = useAuthentication()
  const [promotionToolData, setPromotionToolData] = useState<DocumentType[] | null>(null)
  const [variousOrderFormData, setVariousOrderFormData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getDocumentsAction({ type_id: 2, category_id: 25, user_id: session_user_id }).then(data => {
      setPromotionToolData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '30')
        else return null
      })
      setVariousOrderFormData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '31')
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='販促注文書／パネル' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='セキュリティハウス販促ツール一覧表' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {promotionToolData && promotionToolData.length !== 0 ? (
            promotionToolData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='各種注文書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {variousOrderFormData && variousOrderFormData.length !== 0 ? (
            variousOrderFormData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
    </Container>
  )
}

export default DocumentVideoOrderFormPage
