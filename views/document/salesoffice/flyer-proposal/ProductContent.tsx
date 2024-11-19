'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import DocCardButton from '@/views/document/DocCardButton'
import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const ProductContent = () => {
  const searchParams = useSearchParams()
  const [docData, setDocData] = useState<DocumentType[] | null>([])
  const { session_user_id } = useAuthentication()

  const catParams = searchParams.get('cat')

  useEffect(() => {
    getDocumentsAction({ type_id: 1, category_id: 1, user_id: session_user_id }).then(data => {
      const params = catParams ? catParams : 2024
      const yearFilter = Number(params)
      setDocData(
        data.filter(
          (item: DocumentType) => !isNaN(yearFilter) && new Date(item.created_at).getFullYear() === yearFilter
        )
      )
    })
  }, [session_user_id, catParams])

  return (
    <div className='md:w-[calc(100%-246px)] flex flex-col gap-2'>
      {docData && docData.length !== 0 ? (
        docData
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .map((doc, key) => <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />)
      ) : (
        <p className='py-12 text-lg'>表示する資料がありません。</p>
      )}
    </div>
  )
}

export default ProductContent
