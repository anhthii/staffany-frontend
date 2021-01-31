import React, { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '70%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
}

export default function ShiftModal({
  title,
  description,
  show,
  onClose,
  onUpdate,
  onDelete,
}) {
  const [titleValue, setTitle] = useState(title)
  const [descValue, setDesc] = useState(description)

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const onSubmit = () => {
    onUpdate(titleValue, descValue)
    onClose()
  }

  const onOverlayClick = (e) => {
    // this is to stop click propagation in the react event system
    e.stopPropagation()
    // this is to stop click propagation to the native document click
    e.nativeEvent.stopImmediatePropagation()
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <Modal
      isOpen={show}
      onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div onClick={onOverlayClick}>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          Event
        </div>

        <div className="editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={titleValue}
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Description"
            value={descValue}
            onChange={(e) => setDesc(e.target.value)}
          />
          {/* buttons */}
          <div className="buttons flex">
            <div
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
              onClick={onClose}
            >
              Close
            </div>
            <div
              onClick={onSubmit}
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
            >
              Update
            </div>
            <div
              onClick={onDelete}
              className="btn border p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-red-500"
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
