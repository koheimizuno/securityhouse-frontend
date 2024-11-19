'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import DocumentCard from '@/views/document/DocumentCard'
import { getDocumentsAction } from '@/actions/documentAction'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'

const DocumentVideoMaterialsPage = () => {
  const { session_user_id } = useAuthentication()
  const [materialCollectionData, setMaterialCollectionData] = useState<DocumentType[] | null>(null)
  const [videoData, setVideoData] = useState<DocumentType[] | null>(null)
  const [attackDefenseData, setAttackDefenseData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getDocumentsAction({ type_id: 2, category_id: 27, user_id: session_user_id }).then(data => {
      setMaterialCollectionData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '37')
        else return null
      })
      setVideoData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '38')
        else return null
      })
      setAttackDefenseData(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === '39')
        else return null
      })
    })
  }, [session_user_id])
  return (
    <Container className='py-16 flex flex-col gap-12'>
      <PageHeader title='川口能活素材集' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='川口能活素材集について' bar={true} divider={true} />
        <div>
          <p>川口能活氏の映像には「肖像権」「著作権」があり、使用には事前承認が必要です。</p>
          <p>必ず事前にセンターまでご申請下さい。</p>
        </div>
        <div className='flex flex-col gap-4'>
          {materialCollectionData && materialCollectionData.length !== 0 ? (
            materialCollectionData.map((doc, key) => (
              <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='動画' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {videoData && videoData.length !== 0 ? (
            videoData.map((doc, key) => <DocCardButton key={key} title={doc.title} file={doc.attachment} size='lg' />)
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='その他素材' bar={true} divider={true} />
        <p>ロゴ・イラスト・バナー素材はこちら</p>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='攻める守備ロゴ' bar={true} divider={true} />
        <div>
          <p>ファイルは圧縮してありますので、ダウンロード後に解凍ソフトで解凍してください。</p>
          <ul>
            <li>・素材等の再配布、または販売行為は禁じます。</li>
            <li>・素材のセキュリティシステムの販売活動以外での使用しないで下さい。</li>
          </ul>
        </div>
        <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
          {attackDefenseData && attackDefenseData.length !== 0 ? (
            attackDefenseData.map((doc, key) => (
              <DocumentCard key={key} title={doc.title} img={doc.image} attachment={doc.attachment} />
            ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
    </Container>
  )
}

export default DocumentVideoMaterialsPage
