'use client'
import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { getINextBrandDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentRegistrationPage = () => {
  const { session_user_id } = useAuthentication()
  const [registrationDocData, setRegistrationDocData] = useState<DocumentType[] | null>(null)
  const [otherInfoDocData, setOtherInfoDocData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getINextBrandDocumentsAction({ category_id: 2, user_id: session_user_id }).then(data => {
      setRegistrationDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 2)
        else return null
      })
      setOtherInfoDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 5)
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='登録関係' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='登録関係' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {registrationDocData && registrationDocData.length !== 0 ? (
            registrationDocData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='その他　ご案内' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {otherInfoDocData && otherInfoDocData.length !== 0 ? (
            otherInfoDocData.map((doc, key) => (
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

export default DocumentRegistrationPage
