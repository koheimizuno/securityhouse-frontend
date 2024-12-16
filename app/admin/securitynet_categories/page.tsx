'use client'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import Table from '@/components/admin/Table';
import ButtonSet from '@/components/admin/ButtonSet';
import { useSearchableData } from '@/actions/adminAction';

const SecuritynetCategories = () => {
    const {
      data,
      currentPage,
      totalPages,
      onSearch,
      setCurrentPage,
    } = useSearchableData('http://localhost:4000/securitynet_categories/', ['title'], 0);
  
  
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
                        { key: 'title', label: 'タイトル' }
                    ]}
                    data={data}
                    baseUrl="/securitynet_categories"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
      </Container>
    );
  };
  
  export default SecuritynetCategories;
