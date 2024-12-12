'use client'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import Table from '@/components/admin/Table';
import ButtonSet from '@/components/admin/ButtonSet';
import { useSearchableData } from '@/actions/adminAction';

const Companies = () => {
    const {
      data,
      currentPage,
      totalPages,
      onSearch,
      setCurrentPage,
    } = useSearchableData('http://localhost:4000/companies/', ['name', 'furigana', 'phone', 'address'], 0);
  
  
    return (
      <Container className="py-16 flex flex-col gap-12">
        <div className='flex relative'>
            <Sidemenu />
            <div className="w-full">
                <ButtonSet
                    onSearchSubmit={onSearch}
                    links={[
                        { label: '新規登録', href: '/create' },
                    ]}
                />
                <Table
                    columns={[
                        { key: 'name', label: '名前' },
                        { key: 'furigana', label: 'フリガナ'},
                        { key: 'phone', label: '電話番号' },
                        { key: 'address', label: '住所' }
                    ]}
                    data={data}
                    baseUrl="/companies"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
      </Container>
    );
  };
  
  export default Companies;
