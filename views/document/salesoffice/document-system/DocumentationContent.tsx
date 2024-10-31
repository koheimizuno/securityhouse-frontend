'use client'

import SectionTitle from '@/components/common/SectionTitle'
import DocCardButton from '@/views/document/DocCardButton'
import { Divider } from '@nextui-org/react'

const DocumentationContent = () => {
  return (
    <div className='md:w-[calc(100%-246px)] flex flex-col gap-16'>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='セキュリティシステム請負契約書' bar={true} divider={true} />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>個人　クレジット</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>個人　現金</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>個人　リース</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='ユーザーへの契約時書類' bar={true} divider={true} />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>契約時の同意書</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>特定商取引法注意他</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>メンテナンス契約書 一般用1年以降有料</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <SectionTitle title='保守・メンテナンス' bar={true} divider={true} />
        <div className='flex justify-between flex-wrap gap-8'>
          <h4 className='md:py-4 md:max-w-[220px]'>修理サービス依頼書</h4>
          <div className='flex flex-col gap-2 md:w-[480px]'>
            <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
            <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
          </div>
        </div>
        <Divider />
      </section>
    </div>
  )
}

export default DocumentationContent
