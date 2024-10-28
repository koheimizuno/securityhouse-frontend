'use client'

import { Modal as NextUIModal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

type ModalProps = {
  title: string
  body?: string
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

const Modal = ({ title, body, isOpen, onClose, onSubmit }: ModalProps) => {
  return (
    <NextUIModal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>{title || 'Are you sure?'}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onClose}>
            いいえ
          </Button>
          <Button color='primary' onPress={onSubmit}>
            はい
          </Button>
        </ModalFooter>
      </ModalContent>
    </NextUIModal>
  )
}

export default Modal
