export const getImageAlt = (src: string) => {
  let fileNameWithExtension: string | undefined = src.split('/').pop()

  let fileNameWithoutExtension = fileNameWithExtension
    ? fileNameWithExtension.split('.').slice(0, -1).join('.')
    : undefined

  return fileNameWithoutExtension
}
