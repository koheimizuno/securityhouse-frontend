import DataLink from '@/components/common/DataLink'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'

const DocumentSection = () => {
  return (
    <Container>
      <SectionTitle title='資料集' icon='/images/data-icon.svg' />
      <div className='mt-6'>
        <h3>営業・事務</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3'>
          <DataLink src='/images/note-icon.svg' title='チラシ・提案書' />
          <DataLink src='/images/video-icon.svg' title='動画' />
          <DataLink src='/images/pr-icon.svg' title='販促物' />
          <DataLink src='/images/doc-icon.svg' title='書類関係' />
        </div>
      </div>
      <div className='mt-6'>
        <h3>商品・技術</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3'>
          <DataLink src='/images/brand-icon.svg' title='SHブランド' />
          <DataLink src='/images/takex-icon.svg' title='TAKEXブランド' />
          <DataLink src='/images/security-icon.svg' title='セキュリネット' />
          <DataLink src='/images/inext-icon.svg' title='i-NEXT' />
        </div>
      </div>
    </Container>
  )
}

export default DocumentSection
