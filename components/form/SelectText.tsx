'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

interface Option {
  id: string
  title: string
}

interface SelectTextProps {
  name: string
  options: Option[]
  value: string
  onChange: (name: string, value: string) => void
  placeholder?: string
  className?: string
}

const SelectText: React.FC<SelectTextProps> = ({ name, options, value, onChange, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleOptionClick = (optionValue: string) => {
    onChange(name, optionValue)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.id === value)

  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className={`bg-colorGray1 border border-colorGray2 h-10 md:h-12 px-5 flex items-center justify-between cursor-pointer rounded-md ${className}`}
        onClick={handleToggle}
      >
        <span>{selectedOption ? selectedOption.title : placeholder}</span>
        <span>
          <Image src='/images/arrow-bottom.svg' alt='arrow-bottom' width={12} height={12} />
        </span>
      </div>
      {isOpen && (
        <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg'>
          {options.map(option => (
            <div
              key={option.id}
              className='px-4 py-3 hover:bg-gray-100 cursor-pointer'
              onClick={() => handleOptionClick(option.id)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectText
