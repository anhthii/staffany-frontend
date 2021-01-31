import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '40%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
}

export default function ShiftModal({
  data,
  show,
  onClose,
  onDelete,
  onSave,
  setData,
  resetData,
}) {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function handleOnSave() {
    const newData = {
      ...data,
      title: data.title,
      description: data.description,
    }
    onSave(newData)
    // reset data
    resetData()
    onClose()
  }

  function onFieldChange(e) {
    const fieldName = e.target.name
    setData({ ...data, [fieldName]: e.target.value })
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
      {/* <div onClick={onOverlayClick}> */}
      <div>
        <button
          onClick={onClose}
          className="btn border p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-gray-500 float-right"
        >
          Close
        </button>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          Shift
        </div>

        <div className="editor flex flex-col text-gray-800 p-4 max-w-2xl">
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            name="title"
            type="text"
            onChange={onFieldChange}
            value={data.title}
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Description"
            value={data.description}
            name="description"
            onChange={onFieldChange}
          />
          {/* buttons */}
          <div className="buttons flex justify-end mt-4">
            {/* <div */}
            {/*   className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto" */}
            {/*   onClick={onClose} */}
            {/* > */}
            {/*   Close */}
            {/* </div> */}
            <div
              onClick={handleOnSave}
              className="btn border border-green-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-green-500 hover:transition-colors hover:bg-gradient-to-tr transform transition hover:scale-110 ease-out duration-300 hover:shadow-md"
            >
              Save
            </div>
            <div
              onClick={onDelete.bind(null, data.id)}
              className="btn border p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-red-500 hover:transition-colors hover:bg-gradient-to-tr transform transition hover:scale-110 ease-out duration-300 hover:shadow-md"
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
