'use client'

import Modal from '@/components/modal'

type DeletePostModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

const DeletePostModal = ({ isOpen, onClose, onSubmit }: DeletePostModalProps) => {
  return <Modal title='削除しますか？' isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
}

export default DeletePostModal
