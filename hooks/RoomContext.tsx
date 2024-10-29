/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react'

export const RoomContext = createContext<any>(null)

export const useRoom = () => {
  return useContext(RoomContext)
}
