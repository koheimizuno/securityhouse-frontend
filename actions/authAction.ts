import { UsersType } from '@/types/userType'
import axios from 'axios'

export const registerAction = async (
  payload: Pick<UsersType, 'uid' | 'email' | 'password' | 'role_id' | 'group_id'>
) => {
  try {
    const res = await axios.post('/api/user', payload)
    return res
  } catch (err) {
    console.error('Error registering user:', err)
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}

export const loginAction = async (payload: Pick<UsersType, 'email' | 'password'>) => {
  try {
    const res = await axios.post('/api/login', payload)
    return res
  } catch (err) {
    console.error('Error logining user:', err)
    return 'サーバの問題でデータ取得に失敗しました。'
  }
}
