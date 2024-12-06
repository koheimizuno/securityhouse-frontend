'use client'

import React from 'react';

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const AdminImportUser = () => {

  return (
    <Container className="py-16 flex flex-col gap-12">
        <div className='flex relative'>
            <Sidemenu />
            <div className="w-full">
                <h2 className='mb-8'>ユーザーインポート</h2>
                <form>
                  <dl>
                    <dt className='font-bold'>CSVファイル</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='file' className='rounded px-4 py-2 border w-80 max-w-full' accept='.csv'/>
                    </dd>
                  </dl>
                  <Button className='rounded-full transition bg-primary text-white text-lg h-12 mt-10 px-8' >
                    インポートする
                  </Button>
                </form>
            </div>
        </div>
      </Container>
  );
};

export default AdminImportUser;