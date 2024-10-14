'use client'

import React, { useState } from 'react'
import Image from 'next/image'

type InputProps = {
  type?: string
  name: string
  className?: string
  placeholder: string
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText = ({ type = 'text', name, className, placeholder, disabled, onChange }: InputProps) => {
  const [ctype, setCType] = useState(type)
  const [value, setValue] = useState('')
  const [show, setShow] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e)
  }

  const handleShow = () => {
    setShow(!show)
    setCType(show ? 'text' : 'password')
  }

  return (
    <div className='relative'>
      <input
        type={ctype}
        name={name}
        value={value}
        className={`w-full h-10 md:h-12 bg-colorGray1 border border-colorGray2 focus:outline-none py-2 px-4 rounded-md ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />
      {type === 'password' && (
        <button className='absolute top-1/2 right-2 -translate-y-1/2 opacity-50 hover:opacity-100' onClick={handleShow}>
          <Image
            src={show ? '/images/eye-open.svg' : '/images/eye-close.svg'}
            alt={show ? 'eye-open' : 'eye-close'}
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  )
}

export default InputText
