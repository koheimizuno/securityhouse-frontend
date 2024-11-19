'use client'

import { useEffect, useState } from 'react'

import PageHeader from '@/components/common/PageHeader'
import Container from '@/components/layout/Container'
import DocumentCard from '@/views/document/DocumentCard'

import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentUniversityPage = () => {
  const { session_user_id } = useAuthentication()
  const [universityDocData, setUniversityDocData] = useState<DocumentType[] | null>([])

  useEffect(() => {
    getDocumentsAction({ type_id: 1, category_id: 13, user_id: session_user_id }).then(data =>
      setUniversityDocData(data)
    )
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-12'>
      <PageHeader title='教育施設・大学向け' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
          {universityDocData &&
            universityDocData.map((doc, key) => (
              <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
            ))}
        </div>
      </section>
    </Container>
  )
}

export default DocumentUniversityPage