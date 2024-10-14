import toast from 'react-hot-toast'

export const toastHandler = (status: any, successMsg: string, errMsg: string) => {
  if (status === 200) {
    toast.success(successMsg)
  } else {
    toast.error(errMsg)
  }
}
