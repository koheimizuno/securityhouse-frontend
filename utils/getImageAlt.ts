export const getImageAlt = (src: string) => {
  const fileNameWithExtension: string | undefined = src.split('/').pop()

  const fileNameWithoutExtension = fileNameWithExtension
    ? fileNameWithExtension.split('.').slice(0, -1).join('.')
    : undefined

  return fileNameWithoutExtension
}
