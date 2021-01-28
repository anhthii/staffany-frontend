import PropTypes from 'prop-types'
import React from 'react'

export default function ShiftContent({
  start,
  end,
  onEditClick,
  title,
  description,
}) {
  return (
    <div
      style={{
        background: '#87CEEB',
        height: '100%',
        border: '1px solid black',
      }}
      className="relative"
    >
      {start} - {end}
      <span className="ml-2">{title.substring(0, 5) + '...'}</span>
      <button
        className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-1 rounded shadow hover:shadow-md outline-none focus:outline-none absolute right-2"
        type="button"
        onClick={onEditClick}
      >
        Edit
      </button>
    </div>
  )
}

ShiftContent.propTypes = {
  end: PropTypes.string,
  onEditClick: PropTypes.func,
  start: PropTypes.string,
}
