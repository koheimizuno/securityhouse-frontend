'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useFetchDetail } from '@/actions/adminAction';
import { userDetailType } from '@/types/userDetailType'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';

const AdminUserDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: user, loading, error } = useFetchDetail<userDetailType>(
    'http://localhost:4000/users/detail', // APIエンドポイント
    { id: id } // クエリパラメータ
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="py-16 flex flex-col gap-12">
      <div className='flex relative'>
        <Sidemenu />
        <div className="w-full">
          {user ? (
            <div>
              <h2 className='mb-8'>ユーザー詳細</h2>
              <dl>
                <dt className='font-bold'>名前</dt>
                <dd className='border-b mt-2 pb-4 md:pl-4'>{user.name}</dd>
                <dt className='font-bold mt-6'>メールアドレス</dt>
                <dd className='border-b mt-2  pb-4 md:pl-4'>{user.email}</dd>
                <dt className='font-bold mt-6'>グループ</dt>
                <dd className='border-b mt-2 pb-4 md:pl-4'>
                  {
                    <span
                      dangerouslySetInnerHTML={{
                        __html: user.group.join('<br />'),
                      }}
                    />
                  }
                </dd>
              </dl>
            </div>
          ) : (
            <p>ユーザーが見つかりませんでした。</p>
          )}
          <Link href={'/admin/users'}>
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

export default AdminUserDetail;