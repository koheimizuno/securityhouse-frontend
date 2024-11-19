'use client'

import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'

import { getDocumentsAction } from '@/actions/documentAction'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { Divider } from '@nextui-org/react'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentationContent = () => {
  // const searchParams = useSearchParams()
  const { session_user_id } = useAuthentication()
  const [documentationData, setDocumentationData] = useState<DocumentType[] | null>(null)

  // const categoryId = searchParams.get('cat') ? searchParams.get('cat') : '42'

  useEffect(() => {
    getDocumentsAction({ type_id: 1, category_id: 26, user_id: session_user_id }).then(data =>
      setDocumentationData(data)
    )
  }, [session_user_id])

  return (
    <div className='md:w-[calc(100%-246px)] flex flex-col gap-16'>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='セキュリティシステム請負契約書' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {documentationData && documentationData.length !== 0 ? (
            documentationData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='ユーザーへの契約時書類' bar={true} divider={true} />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>契約時の同意書</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' file='' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' file='' size='sm' />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>特定商取引法注意他</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' file='' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' file='' size='sm' />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>メンテナンス契約書 一般用1年以降有料</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' file='' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' file='' size='sm' />
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='保守・メンテナンス' bar={true} divider={true} />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>修理サービス依頼書</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' file='' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' file='' size='sm' />
          </div>
        </div>
        <Divider />
      </section>
    </div>
  )
}

export default DocumentationContent
