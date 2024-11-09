'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { useAuthentication } from '@/hooks/AuthContext'
import { getDocumentVideoAction } from '@/actions/documentAction'
import { VideoType } from '@/types/videoType'
import { handleDownload } from '@/utils/handleDownload'

const DocumentVideoPage = () => {
  const [seminarVideos, setSeminarVideos] = useState<VideoType[] | null>(null)
  const [promotionVideos, setPromotionVideos] = useState<VideoType[] | null>(null)
  const { session_user_id } = useAuthentication()
  useEffect(() => {
    getDocumentVideoAction({ user_id: session_user_id }).then((data: VideoType[]) => {
      const seminarVideosRes = data.filter(movie => movie.code === 'セミナー動画')
      const promotionVideosRes = data.filter(movie => movie.code === 'プロモーション動画')
      setSeminarVideos(seminarVideosRes)
      setPromotionVideos(promotionVideosRes)
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
          {seminarVideos &&
            seminarVideos
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map(video => (
                <DocCardButton
                  key={video.id}
                  title={video.title}
                  file={video.file}
                  icon='/images/icons/youtube.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                />
              ))}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='プロモーション 動画' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {promotionVideos &&
            promotionVideos
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map(video => (
                <DocCardButton
                  key={video.id}
                  title={video.title}
                  file={video.file}
                  icon='/images/icons/youtube.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                />
              ))}
        </div>
      </section>
    </Container>
  )
}

export default DocumentVideoPage
