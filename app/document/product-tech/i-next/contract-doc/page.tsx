'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { getINextBrandDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentContractDocPage = () => {
  const { session_user_id } = useAuthentication()
  const [contractDocData, setContractDocData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getINextBrandDocumentsAction({ category_id: 1, user_id: session_user_id }).then(data => setContractDocData(data))
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='契約書関係書類' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='契約書関連書類' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {contractDocData && contractDocData.length !== 0 ? (
            contractDocData.map((doc, key) => (
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

export default DocumentContractDocPage
