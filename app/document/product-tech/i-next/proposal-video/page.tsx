'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { useAuthentication } from '@/hooks/AuthContext'
import { getINextBrandDocumentsAction } from '@/actions/documentAction'
import { DocumentType } from '@/types/documentType'

const DocumentProposalVideoPage = () => {
  const { session_user_id } = useAuthentication()
  const [presentationDocData, setPresentationDocData] = useState<DocumentType[] | null>(null)
  const [proposalDocData, setProposalDocData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getINextBrandDocumentsAction({ category_id: 4, user_id: session_user_id }).then(data => {
      setPresentationDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 8)
        else return null
      })
      setProposalDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 9)
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='提案書／動画' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='プレゼン資料' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {presentationDocData && presentationDocData.length !== 0 ? (
            presentationDocData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='提案書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {proposalDocData && proposalDocData.length !== 0 ? (
            proposalDocData.map((doc, key) => (
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

export default DocumentProposalVideoPage
