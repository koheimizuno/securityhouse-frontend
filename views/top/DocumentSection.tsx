import DataLink from '@/components/common/DataLink'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'

const DocumentSection = () => {
  return (
    <Container>
      <SectionTitle title='資料集' icon='/images/icons/data-icon.svg' />
      <div className='mt-6'>
        <h3>営業・事務</h3>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3'>
          <DataLink
            title='チラシ・提案書'
            href='/document/sales-office/proposal'
            img='/images/icons/note-icon.svg'
            className='xl:w-[288px]'
          />
          <DataLink
            title='動画'
            href='/document/sales-office/video'
            img='/images/icons/video-icon.svg'
            className='xl:w-[288px]'
          />
          <DataLink title='販促物' href='/' img='/images/icons/pr-icon.svg' className='xl:w-[288px]' />
          <DataLink title='書類関係' href='/' img='/images/icons/doc-icon.svg' className='xl:w-[288px]' />
        </ul>
      </div>
      <div className='mt-6'>
        <h3>商品・技術</h3>
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-3'>
          <DataLink title='SHブランド' href='/' img='/images/icons/brand-icon.svg' className='xl:w-[288px]' />
          <DataLink title='TAKEXブランド' href='/' img='/images/icons/takex-icon.svg' className='xl:w-[288px]' />
          <DataLink title='セキュリネット' href='/' img='/images/icons/security-icon.svg' className='xl:w-[288px]' />
          <DataLink title='i-NEXT' href='/' img='/images/icons/inext-icon.svg' className='xl:w-[288px]' />
        </ul>
      </div>
    </Container>
  )
}

export default DocumentSection
