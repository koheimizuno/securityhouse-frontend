'use client'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import Table from '@/components/admin/Table';
import ButtonSet from '@/components/admin/ButtonSet';
import { useSearchableData } from '@/actions/adminAction';

const Users = () => {
    const {
      data,
      currentPage,
      totalPages,
      onSearch,
      setCurrentPage,
    } = useSearchableData('/api/manage_user/', ['name', 'email', 'group'], 0, 'userList');
  
  
    return (
      <Container className="py-16 flex flex-col gap-12">
        <div className='flex relative'>
            <Sidemenu />
            <div className="w-full">
                <ButtonSet
                    onSearchSubmit={onSearch}
                    links={[
                        { label: 'CSVインポート', href: '/import' },
                        { label: '新規登録', href: '/create' },
                    ]}
                />
                <Table
                    columns={[
                        { key: 'name', label: '名前' },
                        { key: 'email', label: 'メールアドレス' },
                        { key: 'group', label: 'グループ' },
                        { key: 'created_at', label: '登録日' },
                    ]}
                    data={data}
                    baseUrl="/users"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
      </Container>
    );
  };
  
  export default Users;
