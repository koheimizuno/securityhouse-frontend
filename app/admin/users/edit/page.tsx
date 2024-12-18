'use client'

import { useEffect, useState, useMemo } from 'react';
import Select, { MultiValue } from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useSearchParams, useRouter } from 'next/navigation';
import { useFetchDetail } from '@/actions/adminAction';
import { userDetailType } from '@/types/userDetailType'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

type GroupOption = {
  value: string;
  label: string;
};

const AdminEditUser: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const params = useMemo(() => ({ id }), [id]);

  const { data: user } = useFetchDetail<userDetailType>(
    '/api/manege_user_detail/',
    params
  );

  const [companies, setCompanies] = useState<{ id: number; name: string }[]>([]);
  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<string[] | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPassword(user.password || '');
    }
  }, [user]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('/api/company');
        const formattedCompanies = response.data.companies.map((company: { companyId: number; companyName: string }) => ({
          id: company.companyId,
          name: company.companyName,
        }));
  
        setCompanies(formattedCompanies);
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };
  
    fetchCompanyData();
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get("/api/group/");
  
        const formattedGroups = response.data.groupList.map((group: { groupId: number; groupName: string }) => ({
          id: group.groupId,
          name: group.groupName,
        }));
  
        setGroups(formattedGroups);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    };
  
    fetchGroupData();
  }, []);  

  useEffect(() => {
    if (user && selectedCompany === null) {
      setSelectedCompany(user.company ?? null);
      setSelectedGroups(user.group);
    }
  }, [user, selectedCompany]);

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const handleGroupChange = (selectedOptions: MultiValue<GroupOption>) => {
    setSelectedGroups(selectedOptions.map(option => option.label));
  };

  const router = useRouter(); 

  const handleSave = async () => {
    const requestData = {
      id: user?.id || null,
      name,
      email,
      password,
      company: companies.find(company => company.name === selectedCompany)?.id || null,
      group: selectedGroups?.map(groupName => 
        groups.find(group => group.name === groupName)?.id
      ) || [],
    };
  
    try {
      // POSTリクエスト
      const response = await axios.post('/api/manege_user_update', requestData);
  
      if (response.status === 200) {
        toast.success('保存しました。');
        router.push('/admin/users');
      } else {
        toast.error('保存に失敗しました。');
      }
    } catch (error) {
      toast.error('エラーが発生しました。');
    }
  };  

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
                  <input type='text' className='rounded px-4 py-2 border w-80 max-w-full' value={name} onChange={(e) => setName(e.target.value)} />
                </dd>
                <dt className='font-bold mt-6'>メールアドレス</dt>
                <dd className='border-b mt-2 pb-4'>
                  <input type='email' className='rounded px-4 py-2 border w-80 max-w-full' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </dd>
                <dt className='font-bold mt-6'>パスワード</dt>
                <dd className='border-b mt-2 pb-4'>
                  <input type='password' className='rounded px-4 py-2 border w-80 max-w-full' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
                </dd>
                <dt className='font-bold mt-6'>会社</dt>
                <dd className='border-b mt-2 pb-4'>
                  <select
                    className='rounded px-4 py-2 border w-80 max-w-full'
                    value={selectedCompany || ""}
                    onChange={handleCompanyChange}
                  >
                    {companies.map((company) => (
                      <option key={company.id} value={company.name}>
                        {company.name}
                      </option>
                    ))}
                  </select>

                </dd>
                <dt className='font-bold mt-6'>グループ</dt>
                <dd className='border-b mt-2 pb-4'>
                  <Select
                    options={groups.map(group => ({ value: group.name, label: group.name }))}
                    value={selectedGroups?.map(group => ({ label: group, value: group })) || []}
                    onChange={handleGroupChange}
                    isMulti
                    isClearable
                  />
                </dd>
              </dl>
            </form>
            <div className='flex gap-4 mt-10'>
              <Button className='rounded-full transition bg-primary text-white text-lg h-12 px-8' onClick={handleSave}>
                保存
              </Button>
              <Link href={'/admin/users'}>
                <Button className='rounded-full transition bg-gray-300 text-lg h-12 px-8'>
                  キャンセル
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminEditUser;
