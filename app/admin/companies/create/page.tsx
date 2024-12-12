'use client'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const AdminCreateUser = () => {

  return (
    <Container className="py-16 flex flex-col gap-12">
        <div className='flex relative'>
            <Sidemenu />
            <div className="w-full">
              <div>
                <h2 className='mb-8'>会社登録・編集</h2>
                <form>
                  <dl>
                    <dt className='font-bold'>名前</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='text' className='rounded px-4 py-2 border w-80 max-w-full'  placeholder='⚪︎⚪︎株式会社'/>
                    </dd>
                    <dt className='font-bold mt-6'>フリガナ</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='text' className='rounded px-4 py-2 border w-80 max-w-full' placeholder='⚪︎⚪︎カブシキガイシャ'/>
                    </dd>
                    <dt className='font-bold mt-6'>電話番号</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='tel' className='rounded px-4 py-2 border w-80 max-w-full' placeholder='012-3456-7890'/>
                    </dd>
                    <dt className='font-bold mt-6'>住所</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='text' className='rounded px-4 py-2 border w-80 max-w-full' placeholder='〇〇県〇〇市〇〇1-2-3'/>
                    </dd>
                  </dl>
                </form>
              </div>
              <div className='flex gap-4 mt-10'>
                <Button className='rounded-full transition bg-primary text-white text-lg h-12 px-8' >
                  保存
                </Button>
                <Link href={'/admin/companies'}>
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

export default AdminCreateUser;