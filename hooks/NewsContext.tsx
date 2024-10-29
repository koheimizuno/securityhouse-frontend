/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react'

export const NewsContext = createContext<any>(null)

export const useNews = () => {
  return useContext(NewsContext)
}
