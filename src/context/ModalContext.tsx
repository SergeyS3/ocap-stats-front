import { createContext, PropsWithChildren, ReactElement, useContext, useRef, useState } from 'react'
import './ModalContext.css'


type Context = {
  openModal: (content: ReactElement) => void,
  closeModal: () => void,
}

const ModalContext = createContext({} as Context)

export const useModal = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [content, setContent] = useState(null as ReactElement | null)
  const ref = useRef(null as HTMLDialogElement | null)

  const openModal: Context['openModal'] = content => {
    setContent(content)
    ref.current?.showModal()
  }
  const closeModal: Context['closeModal'] = () => {
    ref.current?.close()
    setContent(null)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <dialog
        onClick={({ clientX: x, clientY: y }) => {
          const { top, bottom, left, right } = ref.current!.getBoundingClientRect()
          if (y < top || y > bottom || x < left || x > right)
            ref.current!.close()
        }}
        onClose={closeModal}
        ref={ref}
        className='modal'
      >
        {content}
      </dialog>
      {children}
    </ModalContext.Provider>
  )
}
