'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocumentCard from '@/views/document/DocumentCard'
import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentPromotionImagesPage = () => {
  const { session_user_id } = useAuthentication()
  const [protectBannerData, setProtectBannerData] = useState<DocumentType[] | null>(null)
  const [recruitBannerData, setRecruitBannerData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getDocumentsAction({ type_id: 2, category_id: 24, user_id: session_user_id }).then(data => {
      setProtectBannerData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '28')
        else return null
      })
      setRecruitBannerData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '29')
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='ロゴ／イラスト／バナー素材' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='くらし守るバナー' bar={true} divider={true} />
        <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
          {protectBannerData && protectBannerData.length !== 0 ? (
            protectBannerData.map((doc, key) => (
              <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='リクルート用バナー' bar={true} divider={true} />
        <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
          {recruitBannerData && recruitBannerData.length !== 0 ? (
            recruitBannerData.map((doc, key) => (
              <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
    </Container>
  )
}

export default DocumentPromotionImagesPage
