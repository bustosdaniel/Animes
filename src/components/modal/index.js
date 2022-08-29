import React from 'react'
import '../modal/index.css'

export default function Modal({
  children,
  title,
  isOpen,
  toggleModal,
  selectedAnime
}) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="modal-title">
              <p>{selectedAnime.title}</p>
              <button className="close-modal" onClick={toggleModal}>
                x
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
