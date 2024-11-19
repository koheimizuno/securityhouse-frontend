'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { Button } from '@nextui-org/react'
import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentVideoPhotosPage = () => {
  const { session_user_id } = useAuthentication()
  const [faxAppFormData, setFaxAppFormData] = useState<DocumentType[] | null>(null)
  const [anywhereCameraData, setAnywhereCameraData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getDocumentsAction({ type_id: 2, category_id: 26, user_id: session_user_id }).then(data => {
      setFaxAppFormData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '32')
        else return null
      })
      setAnywhereCameraData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '33')
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-12'>
      <PageHeader title='設置写真' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        <SectionTitle title='パネルデザインについて' bar={true} divider={true} />
        <ul className='flex flex-col gap-2'>
          <li>・レンタルは貸出規約をご確認の上「パネル貸出申込書」のFAXをお願いします。</li>
          <li>
            ・ご購入は「パネル購入申込書」に記入の上、FAXをお願いします。納期、費用についてはお問い合わせください。
          </li>
        </ul>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='FAX申込書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {faxAppFormData && faxAppFormData.length !== 0 ? (
            faxAppFormData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='どこでもカメラ' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {anywhereCameraData && anywhereCameraData.length !== 0 ? (
            anywhereCameraData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
        <p className='bg-bgSemiblue min-h-[300px] flex justify-center items-center'>貸出規約</p>
      </section>
      <Link href='photos/panel' className='text-center'>
        <Button color='primary' className='w-[280px] rounded-full' size='lg'>
          パネル一覧
        </Button>
      </Link>
    </Container>
  )
}

export default DocumentVideoPhotosPage
