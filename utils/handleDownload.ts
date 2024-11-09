export const handleDownload = async (url: string) => {
  try {
    // Fetch the file and convert it to a Blob
    const response = await fetch(url)
    const blob = await response.blob()

    // Create a temporary URL for the Blob and trigger the download
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'video.mp4' // Specify a filename

    // Append link to body and trigger the click
    document.body.appendChild(link)
    link.click()

    // Clean up by revoking the Object URL and removing the link
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  } catch (error) {
    console.error('Download failed:', error)
  }
}
