'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { useAuthentication } from '@/hooks/AuthContext'
import { getDocumentsAction } from '@/actions/documentAction'
import { DocumentType } from '@/types/documentType'

const DocumentVideoPage = () => {
  const [seminarVideos, setSeminarVideos] = useState<DocumentType[] | null>(null)
  const [promotionVideos, setPromotionVideos] = useState<DocumentType[] | null>(null)
  const { session_user_id } = useAuthentication()
  useEffect(() => {
    getDocumentsAction({ type_id: 3, user_id: session_user_id }).then(data => {
      setSeminarVideos(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 22)
        else return null
      })
      setPromotionVideos(prev => {
        if (prev) return data.filter((item: DocumentType) => item.category_id === 23)
        else return null
      })
    })
  }, [session_user_id])

  return (
    <Container className='py-16 flex flex-col gap-20'>
      <PageHeader title='動画' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='動画について' bar={true} divider={true} />
        <ul>
          <li>
            <p> ※ダウンロードされたムービーの再生にはWindowsMediaPlayer等が必要です。</p>
          </li>
          <li>
            <p> ※Facebook、YouTube等 共有サイトへの投稿はお控え下さいますようお願い致します。</p>
          </li>
        </ul>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='セミナー動画' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {seminarVideos && seminarVideos.length !== 0 ? (
            seminarVideos
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((video, key) => (
                <DocCardButton
                  key={key}
                  title={video.title}
                  file={video.attachment}
                  icon='/images/icons/youtube.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                />
              ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='プロモーション 動画' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {promotionVideos && promotionVideos.length !== 0 ? (
            promotionVideos
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((video, key) => (
                <DocCardButton
                  key={key}
                  title={video.title}
                  file={video.attachment}
                  icon='/images/icons/youtube.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                />
              ))
          ) : (
            <p className='py-12 text-lg'>表示する資料がありません。</p>
          )}
        </div>
      </section>
    </Container>
  )
}

export default DocumentVideoPage
