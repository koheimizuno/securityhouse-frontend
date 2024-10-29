import publicPaths from '@/data/publicPaths'

const isPublicPage = (pathname: string): boolean => {
  return publicPaths.includes(pathname)
}

export default isPublicPage
