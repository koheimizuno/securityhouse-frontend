'use client'

import Container from '@/components/layout/Container';
import Sidemenu from '@/components/admin/SideMenu';
import Table from '@/components/admin/Table';
import ButtonSet from '@/components/admin/ButtonSet';
import { useSearchableData } from '@/actions/adminAction';

const News = () => {
    const {
      data,
      currentPage,
      totalPages,
      onSearch,
      setCurrentPage,
    } = useSearchableData('http://localhost:4000/news', ['title'], 0);
  
  
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
                        { key: 'title', label: 'タイトル' },
                    ]}
                    data={data}
                    baseUrl="/news"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    deleteUrl = 'api/hogehoge'
                />
            </div>
        </div>
      </Container>
    );
  };
  
  export default News;
