const getImageAlt = (src: string) => {
  // Extract the filename with extension
  let fileNameWithExtension: string | undefined = src.split('/').pop()

  // Remove the extension from the filename
  let fileNameWithoutExtension = fileNameWithExtension
    ? fileNameWithExtension.split('.').slice(0, -1).join('.')
    : undefined

  return fileNameWithoutExtension
}

export default getImageAlt
