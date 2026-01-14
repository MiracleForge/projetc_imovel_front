'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type ModalContextType = {
  isOpen: boolean
  modalContent: ReactNode | null
  openModal: (content?: ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function PricingModalContext({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)

  const openModal = (content?: ReactNode) => {
    setModalContent(content || null)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
  }

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal deve ser usado dentro de ModalProvider')
  }
  return context
}
