'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useFetchDetail } from '@/actions/adminAction'; 
import { companyDetailType } from '@/types/companyDetailType'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';

const AdminCompanyDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: detail } = useFetchDetail< companyDetailType >(
    'http://localhost:4000/companies/detail',
    { id: id }
  );

  return (
    <Container className="py-16 flex flex-col gap-12">
        <div className='flex relative'>
            <Sidemenu />
            <div className="w-full">
            {detail ? (
              <div>
                <h2 className='mb-8'>会社詳細</h2>
                <dl>
                  <dt className='font-bold'>会社名</dt>
                  <dd className='border-b mt-2 pb-4 md:pl-4'>{detail.name}</dd>
                  <dt className='font-bold mt-6'>フリガナ</dt>
                  <dd className='border-b mt-2  pb-4 md:pl-4'>{detail.furigana}</dd>
                  <dt className='font-bold mt-6'>電話番号</dt>
                  <dd className='border-b mt-2 pb-4 md:pl-4'>{detail.phone}</dd>
                  <dt className='font-bold mt-6'>住所</dt>
                  <dd className='border-b mt-2 pb-4 md:pl-4'>{detail.address}</dd>
                </dl>
              </div>
            ) : (
              <p>会社が見つかりませんでした。</p>
            )}
            <Link href={'/admin/companies'}>
              <Button className='rounded-full transition bg-primary text-white h-12 px-8 mt-10' >
                <Image src={'/images/icons/arrow-circle-left-outline.svg'} alt='' width={24} height={24} />
                一覧に戻る
              </Button>
            </Link>
            </div>
        </div>
      </Container>
  );
};

export default AdminCompanyDetail;