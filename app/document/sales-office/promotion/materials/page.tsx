'use client'

import Container from '@/components/layout/Container'
import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import DocumentCard from '@/views/document/DocumentCard'

const DocumentVideoMaterialsPage = () => {
  return (
    <Container className='py-16 flex flex-col gap-12'>
      <PageHeader title='川口能活素材集' subtitle='資料集' />
      <section className='flex flex-col gap-6'>
        <SectionTitle title='リクルート用バナー' bar={true} divider={true} />
        <div>
          <p>川口能活氏の映像には「肖像権」「著作権」があり、使用には事前承認が必要です。</p>
          <p>必ず事前にセンターまでご申請下さい。</p>
        </div>
        <DocCardButton title='「攻撃る守備」営業展開（企業キャラクター契約概略について）' file='' />
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='動画' bar={true} divider={true} />
        <div className='flex flex-col gap-3'>
          <DocCardButton
            title='くらしを守る次世代の超防犯システム（2023）'
            file=''
            icon='/images/icons/youtube.svg'
            subicon='/images/icons/video-icon-circle.svg'
          />
          <DocCardButton
            title='くらしを守る次世代の超防犯システム（ショート.ver）（2023）'
            file=''
            icon='/images/icons/youtube.svg'
            subicon='/images/icons/video-icon-circle.svg'
          />
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
          <DocumentCard title='写真等に使用する場合' img='/images/doc-office-img01.png' />
          <DocumentCard title='バックが白場の場合' img='/images/doc-office-img02.png' />
          <DocumentCard title='名刺サイズ' img='/images/doc-store-img01.png' />
        </div>
      </section>
    </Container>
  )
}

export default DocumentVideoMaterialsPage
