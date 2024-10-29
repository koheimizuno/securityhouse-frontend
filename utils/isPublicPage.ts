export const isPublicPage = (pathname: string) => {
  const publicPaths = [/^\/login$/, /^\/register$/, /^\/forgot-password$/, /^\/profile\/\d+$/]
  return publicPaths.some(pattern => pattern.test(pathname))
}

export const isDisplayHeaderPage = (pathname: string) => {
  const publicPaths = [/^\/login$/, /^\/register$/, /^\/forgot-password$/]
  return !publicPaths.some(pattern => pattern.test(pathname))
}
