'use client'

import React, { useMemo } from 'react'

const Loading = ({ flag = '0', className }: { flag?: string; className?: string }) => {
  const style = useMemo(() => {
    switch (flag) {
      case '0':
        return 'h-[100vh]'
        break
      case '1':
        return 'h-[calc(100vh-328.5px)]'
        break
      case '2':
        return 'py-10'
        break
      default:
        break
    }
  }, [])
  return (
    <div className={`flex flex-col justify-center items-center ${style}`}>
      <div className={`w-20 h-20 border-t-2 border-b-2 border-primary rounded-full animate-spin ${className}`}></div>
    </div>
  )
}

export default Loading
