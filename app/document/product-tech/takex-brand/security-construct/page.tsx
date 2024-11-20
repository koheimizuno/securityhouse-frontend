'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { getTakexBrandDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentSecurityConstructPage = () => {
  const { session_user_id } = useAuthentication()
  const [wireDiagramData, setWireDiagramData] = useState<DocumentType[] | null>(null)
  const [specialInfoData, setSpecialInfoData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getTakexBrandDocumentsAction({ user_id: session_user_id, category_id: 2 }).then(data => {
      setWireDiagramData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 6)
      })
      setSpecialInfoData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 7)
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='防犯工事トクトク情報' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='各種接続方法・配線図' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {wireDiagramData && wireDiagramData.length !== 0 ? (
            wireDiagramData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='とくとく情報～その2～' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {specialInfoData && specialInfoData.length !== 0 ? (
            specialInfoData.map((doc, key) => (
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

export default DocumentSecurityConstructPage
