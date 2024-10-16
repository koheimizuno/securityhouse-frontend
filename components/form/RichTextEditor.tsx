import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface RichTextEditorProps {
  onChange: (data: string) => void
  initialData?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange, initialData = '' }) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false)

  useEffect(() => {
    setIsEditorLoaded(true)
  }, [])

  return (
    <div className='w-full md:w-[480px]'>
      {isEditorLoaded && (
        <CKEditor
          editor={ClassicEditor}
          data={initialData}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              'blockQuote',
              'insertTable',
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'mediaEmbed',
              '|',
              'undo',
              'redo'
            ]
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            onChange(data)
          }}
        />
      )}
    </div>
  )
}

export default RichTextEditor
