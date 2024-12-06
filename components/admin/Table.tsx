'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TableProps } from '@/types/adminTableType'
import Pagination from '@/components/admin/Pagination'

const Table = ({columns, data, baseUrl, currentPage, setCurrentPage, totalPages }: TableProps) => {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const itemsPerPage = 10

  // ソート処理
  const sortedData = React.useMemo(() => {
    if (!sortKey) return data
    const sorted = [...data].sort((a, b) => {
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

  const handleDelete = (row: any) => {
    const confirmation = window.confirm('データを削除しますか？');
    if (confirmation) {
      alert('データを削除しました。');
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
                  key={`${column.key}-${row[columns[0].key]}-${index}`}
                  className="px-4 py-2"
                >
                  {row[column.key] || 'N/A'}
                </td>
              ))}
              <td className="px-4 py-2 whitespace-nowrap">
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
        totalPages={Math.ceil(data.length / itemsPerPage)} // データの総数に応じてページ数を計算
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default Table
