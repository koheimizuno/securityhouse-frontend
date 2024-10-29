/* eslint-disable @typescript-eslint/no-explicit-any */
import slugData from '@/config/slugData.json'

export const getBreadcrumbs = (pathname: string) => {
  let slugArr: any[] = pathname.split('/')

  slugArr = slugArr
    .filter(item => item !== '')
    .map(item => {
      slugData.map(slugItem => {
        if (item === slugItem.slug) {
          item = slugItem
        }
      })
      return item
    })
  return slugArr
}
