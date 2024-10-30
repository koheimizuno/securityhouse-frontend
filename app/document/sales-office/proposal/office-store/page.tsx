'use client'

import PageHeader from '@/components/common/PageHeader'
import SectionTitle from '@/components/common/SectionTitle'
import Container from '@/components/layout/Container'
import DocCardButton from '@/views/document/DocCardButton'
import DocumentCard from '@/views/document/DocumentCard'
import { Divider } from '@nextui-org/react'
import Image from 'next/image'

const DocummentOfficeStorePage = () => {
  return (
    <Container className='py-16 flex flex-col gap-8'>
      <div className='flex items-start gap-10'>
        <ul className='w-[205px] hidden md:block'>
          <li className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 cursor-pointer'>
            <span>事務所向け</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'>
            <span>店舗向け</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'>
            <span>強盗対策</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
          <li className='h-12 px-4 flex justify-between items-center bg-colorGray1 border border-colorGray3 border-t-0 cursor-pointer'>
            <span>提案書</span>
            <Image src='/images/icons/arrow-bottom.svg' alt='arrow-bottom.svg' width={12} height={12} />
          </li>
        </ul>
        <div className='w-full md:w-[calc(100%-246px)] flex flex-col gap-8'>
          <PageHeader title='営業・事務' subtitle='資料集' />
          <section className='flex flex-col gap-6'>
            <SectionTitle title='事務所向け' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              <DocumentCard title='守り方改革チラシ.pdf(000KB)' img='/images/doc-office-img01.png' />
              <DocumentCard title='選挙事務所対応.pdf(000KB)' img='/images/doc-office-img02.png' />
            </div>
          </section>
          <section className='flex flex-col gap-6'>
            <SectionTitle title='店舗向け' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              <DocumentCard title='住居併用型向自主機械警備.pdf(000KB)' img='/images/doc-store-img01.png' />
              <DocumentCard title='ワイヤレス非常沿革通報システム.pdf(000KB)' img='/images/doc-store-img02.png' />
              <DocumentCard title='調剤薬局／ドラッグストア.pdf(000KB)' img='/images/doc-store-img03.png' />
            </div>
          </section>
          <section className='flex flex-col gap-6'>
            <SectionTitle title='強盗対策' bar={true} divider={true} />
            <div className='flex flex-col md:flex-row md:flex-wrap items-center gap-4'>
              <DocumentCard title='強盗・不審者対策.pdf(000KB)' img='/images/doc-robbery-img01.png' />
            </div>
          </section>
          <section className='flex flex-col gap-6'>
            <SectionTitle title='提案書' bar={true} divider={true} />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>KDDI様向けi-NEXTのご提案</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>チェーン店様向けセキュリティシステムのご提案</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='KDDI様向けi-NEXTのご提案.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>店舗向けWDR-H401提案書</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='店舗向けWDR-H401提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>コンビニ向け提案書</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='コンビニ向け提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>薬局向け セキュリティシステムご提案書</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='薬局向けセキュリティシステムご提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>auショップ様向けご提案書【WJ-700SH＋フォグガード】</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='auショップ様向けご提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>ドコモショップ様向けご提案書 【見える防犯＋フォグガード】</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='ドコモショップ様向けご提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>霧噴射装置（フォグガード） ＦＧ－Ｓ販売提案</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='霧噴射装置（フォグガード）ＦＧ－Ｓ販売提案.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>犯行を諦めさせる フォグガードご提案書</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='犯行を諦めさせるフォグガードご提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>金融機関向け提案書</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='金融機関向け提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>食品加工工場様向けご提案書</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='薬局向けセキュリティシステムご提案書.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
            <div className='flex justify-between flex-wrap gap-8'>
              <h4 className='md:py-4 md:max-w-[220px]'>盗難防止システムのご提案書 （窃盗対策）</h4>
              <div className='flex flex-col gap-2 w-[480px]'>
                <DocCardButton title='盗難防止システムのご提案書（窃盗対策）.pdf(000KB)' size='sm' />
                <DocCardButton title='圧縮版PDF(00KB)' size='sm' />
                <DocCardButton
                  title='商談中に使う'
                  icon='/images/icons/people-icon.svg'
                  subicon='/images/icons/video-icon-circle.svg'
                  size='sm'
                />
              </div>
            </div>
            <Divider />
          </section>
        </div>
      </div>
    </Container>
  )
}

export default DocummentOfficeStorePage
