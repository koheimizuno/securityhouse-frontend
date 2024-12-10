'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const AdminCreateUser = () => {

  const [companies, setCompanies] = useState<{ id: number; name: string }[]>([]);
  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get<{ id: number; name: string }[]>('http://localhost:4000/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get<{ id: number; name: string }[]>('http://localhost:4000/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };

    fetchGroupData();
  }, []);


  return (
    <Container className="py-16 flex flex-col gap-12">
        <div className='flex relative'>
            <Sidemenu />
            <div className="w-full">
              <div>
                <h2 className='mb-8'>ユーザー登録・編集</h2>
                <form>
                  <dl>
                    <dt className='font-bold'>名前</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='text' className='rounded px-4 py-2 border w-80 max-w-full'  placeholder='田中太郎'/>
                    </dd>
                    <dt className='font-bold mt-6'>メールアドレス</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='email' className='rounded px-4 py-2 border w-80 max-w-full' placeholder='xxx@yyy.com'/>
                    </dd>
                    <dt className='font-bold mt-6'>パスワード</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <input type='password' className='rounded px-4 py-2 border w-80 max-w-full' placeholder='**********'/>
                    </dd>
                    <dt className='font-bold mt-6'>会社</dt>
                    <dd className='border-b mt-2 pb-4'>
                    <select
                    className='rounded px-4 py-2 border w-80 max-w-full'
                    >
                      <option value="">選択してください</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.name}> 
                          {company.name}
                        </option>
                      ))}
                  </select>
                    </dd>
                    <dt className='font-bold mt-6'>グループ</dt>
                    <dd className='border-b mt-2 pb-4'>
                      <select
                        className="rounded px-4 py-2 border w-80 max-w-full"
                      >
                        <option value="">選択してください</option>
                        {groups.map((group) => (
                          <option key={group.id} value={group.name}>
                            {group.name}
                          </option>
                        ))}
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

export default AdminCreateUser;