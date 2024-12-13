'use client'

import { useEffect, useState } from 'react'

import { getTakexBrandDocumentsAction } from '@/actions/documentAction'
import DataLink from '@/components/common/DataLink'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import { useAuthentication } from '@/hooks/AuthContext'
import { DocumentType } from '@/types/documentType'
import DocCardButton from '@/views/document/DocCardButton'


const DocumentTAKEXBrandPage = () => {
  const { session_user_id } = useAuthentication()
  const [pressureSensCodeData, setPressureSensCodeData] = useState<DocumentType[] | null>(null)

  useEffect(() => {
    getTakexBrandDocumentsAction({ user_id: session_user_id, category_id: 3 }).then(data =>
      setPressureSensCodeData(data)
    )
  }, [session_user_id])

  //リダイレクト先URL
  const TAKEX_REDIRECT_URL = 'https://www.takex-eng.co.jp'
  // リダイレクト処理
  const handleRedirect = () => {
    // localStorageからJWTトークンを取得
    const token = localStorage.getItem('auth')
    if (!token) {
      console.error('JWTトークンが存在しません')
      return
    }

    // リダイレクト先のPATH
    const targetPath = '/rlogin.php' // 遷移先の竹中エンジニアリングWebサイトのパス

    // リダイレクト用URLの生成
    const redirectUrl = `${TAKEX_REDIRECT_URL}?jwt=${encodeURIComponent(token)}&path=${encodeURIComponent(targetPath)}`

    // リダイレクトを実行
    window.location.href = redirectUrl
  }

  return (
    <Container className='py-16 flex flex-col gap-16'>
      <PageHeader title='TAKEXブランド' subtitle='資料集' />
      <section className='flex flex-col gap-8'>
        {/* リダイレクト用のクリック可能な要素 */}
        <p
          className='min-h-[293px] bg-bgSemiblue flex justify-center items-center cursor-pointer'
          onClick={handleRedirect}
        >
          TAKEXブランドはこちら
        </p>
        <ul className='grid grid-cols-2 gap-8'>
          <DataLink title='テクニカルレポート' href='takex-brand/tech-report' />
          <DataLink title='防犯工事トクトク情報' href='takex-brand/security-construct' />
        </ul>
      </section>
      <section className='flex flex-col gap-8'>
        <SectionTitle title='感圧コードセンサ技術資料' bar={true} divider={true} />
        <div className='flex flex-col gap-4'>
          {pressureSensCodeData && pressureSensCodeData.length !== 0 ? (
            pressureSensCodeData.map((doc, key) => (
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

export default DocumentTAKEXBrandPage