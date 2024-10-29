/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react'

export const AuthContext = createContext<any>(null)

export const useAuthentication = () => {
  return useContext(AuthContext)
}
