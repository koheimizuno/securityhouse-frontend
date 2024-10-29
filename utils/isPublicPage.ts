const isPublicPage = (pathname: string) => {
  const publicPaths = [/^\/login$/, /^\/register$/, /^\/forgot-password$/, /^\/profile\/\d+$/]
  return publicPaths.some(pattern => pattern.test(pathname))
}

export default isPublicPage
