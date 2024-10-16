import toast from 'react-hot-toast'

export const toastHandler = (status: any, successMsg: string, errMsg: string, slug?: string) => {
  if (status === 200) {
    toast.success(successMsg)
    if (slug) window.location.href = slug
  } else {
    toast.error(errMsg)
  }
}
