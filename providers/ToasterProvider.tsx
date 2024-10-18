'use client'
import React from 'react'

import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        style: {
          marginTop: '20px',
          marginRight: '20px',
          padding: '10px 20px'
        },
        success: {
          style: {
            background: '#6cc070',
            color: 'white'
          }
        },
        error: {
          style: {
            background: 'red',
            color: 'white'
          }
        }
      }}
    />
  )
}

export default ToasterProvider
