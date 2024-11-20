'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { useAuthentication } from '@/hooks/AuthContext'
import { getINextBrandDocumentsAction } from '@/actions/documentAction'
import { DocumentType } from '@/types/documentType'

const DocumentTechDocPage = () => {
  const { session_user_id } = useAuthentication()
  const [cameraMethodData, setCameraMethodData] = useState<DocumentType[] | null>(null)
  const [networkMethodData, setNetworkMethodData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getINextBrandDocumentsAction({ category_id: 3, user_id: session_user_id }).then(data => {
      setCameraMethodData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 6)
        else return null
      })
      setNetworkMethodData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 7)
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='技術資料' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='設定方法（カメラ）' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {cameraMethodData && cameraMethodData.length !== 0 ? (
            cameraMethodData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='設定方法（ネットワーク）' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {networkMethodData && networkMethodData.length !== 0 ? (
            networkMethodData.map((doc, key) => (
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

export default DocumentTechDocPage
