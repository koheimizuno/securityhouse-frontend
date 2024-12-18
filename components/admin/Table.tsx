'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import Image from 'next/image'
import Link from 'next/link'
import { TableProps } from '@/types/adminTableType'
import Pagination from '@/components/admin/Pagination'

const Table = ({ columns, data, baseUrl, currentPage, setCurrentPage, totalPages }: TableProps) => {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const itemsPerPage = 10

  const getDataArray = (data: any) => {
    if (Array.isArray(data)) return data;
    for (const value of Object.values(data)) {
      if (Array.isArray(value)) return value;
    }
    return [];
  }

  // ソート処理
  const sortedData = React.useMemo(() => {
    const dataArray = getDataArray(data);
    if (!sortKey) return dataArray;
    const sorted = [...dataArray].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [data, sortKey, sortOrder])

  // ページネーション処理
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedData.slice(start, end)
  }, [sortedData, currentPage])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const handleDelete = async (row: any) => {
    const confirmation = window.confirm('データを削除しますか？');
  
    if (confirmation) {
      try {
        const response = await axios.delete(`/api/manege_user_delete?userId=${row.id}`);
  
        if (response.status === 200) {
          toast.success('削除しました');
          window.location.reload(); 
        } else {
          toast.error('削除に失敗しました');
        }
      } catch (error) {
        console.error('削除エラー:', error);
        toast.error('削除に失敗しました');
      }
    } else {
      alert('削除をキャンセルしました。');
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='min-w-full border-collapse'>
        <thead className='bg-gray-100'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className='px-4 py-2 whitespace-nowrap'
              >
                <div className='flex items-center cursor-pointer justify-center' onClick={() => handleSort(column.key)}>
                  <span className='mr-2'>{column.label}</span>
                  <div className='flex flex-col'>
                    <span
                      className={`text-xs ${sortKey === column.key && sortOrder === 'asc'
                        ? 'text-black font-bold'
                        : 'text-gray-400'
                        }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`text-xs ${sortKey === column.key && sortOrder === 'desc'
                        ? 'text-black font-bold'
                        : 'text-gray-400'
                        }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </th>
            ))}
            <th className='px-4 py-2 whitespace-nowrap'>アクション</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr
              key={`${row[columns[0].key]}-${index}`}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200`}
            >
              {columns.map((column) => (
                <td
                  key={`${row[column.key] || 'unknown'}-${index}`}
                  className="px-4 py-2"
                >
                  {Array.isArray(row[column.key]) ? (
                    <>
                      {row[column.key].map((item: string, idx: number) => (
                        <React.Fragment key={idx}>
                          {item || 'N/A'}
                          {idx < row[column.key].length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    // 配列でない場合はそのまま表示
                    row[column.key] || 'N/A'
                  )}
                </td>              
              ))}
              <td className="px-4 py-2 whitespace-nowrap w-[140px]">
                <button
                  className="px-2 py-1 hover:opacity-60 transition"
                >
                  <Link href={`/admin${baseUrl}/edit?id=${row.id}`}>
                    <Image src="/images/icons/admin-edit.svg" alt="編集" width={20} height={20} />
                  </Link>
                </button>
                <button
                  className="px-2 py-1 hover:opacity-60 transition"
                >
                  <Link href={`/admin${baseUrl}/detail?id=${row.id}`}>
                    <Image src="/images/icons/admin-search.svg" alt="詳細" width={20} height={20} />
                  </Link>
                </button>
                <button
                  className="px-2 py-1 hover:opacity-60 transition"
                  onClick={() => handleDelete(row)}
                >
                  <Image src="/images/icons/admin-bin.svg" alt="削除" width={20} height={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedData.length / itemsPerPage)} // データの総数に応じてページ数を計算
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default Table
