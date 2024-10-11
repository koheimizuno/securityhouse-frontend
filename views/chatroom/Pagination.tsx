'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface PaginationProps {
  currentPage: number
  perPage: number
  totalItems: number
  baseUrl: string
}

const Pagination = ({ currentPage, perPage, totalItems, baseUrl }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / perPage)
  const maxDisplayedPages = 5

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = []
    let startPage: number, endPage: number

    if (totalPages <= maxDisplayedPages) {
      // Show all pages if total pages are less than or equal to maxDisplayedPages
      startPage = 1
      endPage = totalPages
    } else {
      // Calculate start and end pages
      const middlePage = Math.floor(maxDisplayedPages / 2)

      if (currentPage <= middlePage + 1) {
        startPage = 1
        endPage = maxDisplayedPages - 1
        pageNumbers.push(...Array.from({ length: endPage }, (_, i) => i + 1))
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - middlePage) {
        startPage = totalPages - maxDisplayedPages + 2
        endPage = totalPages
        pageNumbers.push(1)
        pageNumbers.push('...')
        pageNumbers.push(...Array.from({ length: maxDisplayedPages - 1 }, (_, i) => startPage + i))
      } else {
        startPage = currentPage - middlePage
        endPage = currentPage + middlePage
        pageNumbers.push(1)
        pageNumbers.push('...')
        pageNumbers.push(...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i))
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  return (
    <nav className='flex items-center justify-center mt-8'>
      <ul className='flex items-center gap-3'>
        {currentPage > 1 ? (
          <li>
            <Link
              href={`${baseUrl}?page=${currentPage - 1}`}
              className='w-9 h-9 flex items-center justify-center rounded-md bg-colorGray1 hover:bg-gray-300'
            >
              <Image
                src='/images/arrow-left-primary.svg'
                alt='arrow-left'
                width={12}
                height={12}
                className='inline-block w-auto h-5'
              />
            </Link>
          </li>
        ) : (
          <li>
            <button
              disabled
              className='w-9 h-9 flex items-center justify-center rounded-md bg-gray-200 text-colorGray3 cursor-not-allowed'
            >
              <Image
                src='/images/arrow-left-primary.svg'
                alt='arrow-left'
                width={12}
                height={12}
                className='inline-block w-auto h-5'
              />
            </button>
          </li>
        )}

        {getPageNumbers().map((pageNum, index) => (
          <li key={index}>
            {pageNum === '...' ? (
              <span className='w-9 h-9 flex items-center justify-center'>...</span>
            ) : (
              <Link
                href={`${baseUrl}?page=${pageNum}`}
                className={`w-9 h-9 flex items-center justify-center rounded-md ${
                  pageNum === currentPage ? 'bg-primary text-white' : 'bg-colorGray1 hover:bg-gray-300'
                }`}
              >
                {pageNum}
              </Link>
            )}
          </li>
        ))}

        {currentPage < totalPages ? (
          <li>
            <Link
              href={`${baseUrl}?page=${currentPage + 1}`}
              className='w-9 h-9 flex items-center justify-center rounded-md bg-colorGray1 hover:bg-gray-300'
            >
              <Image
                src='/images/arrow-right-primary.svg'
                alt='arrow-right'
                width={12}
                height={12}
                className='inline-block w-auto h-5'
              />
            </Link>
          </li>
        ) : (
          <li>
            <button
              disabled
              className='w-9 h-9 flex items-center justify-center rounded-md bg-gray-200 text-colorGray3 cursor-not-allowed'
            >
              <Image
                src='/images/arrow-right-primary.svg'
                alt='arrow-right-primary'
                width={12}
                height={12}
                className='inline-block w-auto h-5'
              />
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
