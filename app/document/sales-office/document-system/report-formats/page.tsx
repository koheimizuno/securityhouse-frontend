'use client'

import { useEffect, useState } from 'react'

import { getDocumentsAction } from '@/actions/documentAction'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocCardButton from '@/views/document/DocCardButton'
import { DocumentType } from '@/types/documentType'
import { useAuthentication } from '@/hooks/AuthContext'

const DocumentReportFormatsPage = () => {
  const { session_user_id } = useAuthentication()
  const [reportDocData, setReportDocData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getDocumentsAction({ type_id: 4, category_id: 41, user_id: session_user_id }).then(data => {
      setReportDocData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 42)
        else return null
      })
    })
  }, [session_user_id])
  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='報告書フォーマット' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='報告書フォーマット' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {reportDocData && reportDocData.length !== 0 ? (
            reportDocData.map((doc, key) => (
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

export default DocumentReportFormatsPage
