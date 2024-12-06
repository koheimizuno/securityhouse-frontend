'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useFetchDetail } from '@/actions/adminAction'; 
import { User } from '@/types/userDetailType'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const AdminEditUser: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const { data: user, loading, error } = useFetchDetail<User>(
    'http://localhost:4000/users/detail',
    { id: userId }
  );
  return (
    <Container className="py-16 flex flex-col gap-12">
        <div className='flex relative'>
            <Sidemenu />
            <div className="w-full">
              <div>
                <h2 className='mb-8'>ユーザー編集・登録</h2>
                <form>
                  <dl>
                    <dt className='font-bold'>名前</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='text' className='rounded px-4 py-2 border w-80 max-w-full' value={user ? user.name: ''}/>
                    </dd>
                    <dt className='font-bold mt-6'>メールアドレス</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='email' className='rounded px-4 py-2 border w-80 max-w-full' value={user ? user.email: ''}/>
                    </dd>
                    <dt className='font-bold mt-6'>パスワード</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='password' className='rounded px-4 py-2 border w-80 max-w-full' placeholder='**********'/>
                    </dd>
                    <dt className='font-bold mt-6'>会社</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <select name="" id="" className='rounded px-4 py-2 border w-80 max-w-full'>
                        <option value="">株式会社AAA</option>
                        <option value="">株式会社BBB</option>
                        <option value="">株式会社CCC</option>
                      </select>
                    </dd>
                    <dt className='font-bold mt-6'>グループ</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <select name="" id="" className='rounded px-4 py-2 border w-80 max-w-full'>
                        <option value="">グループA</option>
                        <option value="">グループB</option>
                        <option value="">グループC</option>
                      </select>
                    </dd>
                  </dl>
                </form>
              </div>
              <div className='flex gap-4 mt-10'>
                <Button className='rounded-full transition bg-primary text-white text-lg h-12 px-8' >
                  保存
                </Button>
                <Link href={'/admin/users'}>
                  <Button className='rounded-full transition bg-gray-300 text-lg h-12 px-8' >
                    キャンセル
                  </Button>
                </Link>
              </div>
            </div>
        </div>
      </Container>
  );
};

export default AdminEditUser;