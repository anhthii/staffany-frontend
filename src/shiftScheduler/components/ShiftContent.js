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
      className="relative h-full shadow-lg rounded-md text-white p-1 text-xs overflow-hidden"
      style={{ backgroundColor: '#506669', borderLeft: '5px solid #65bee0' }}
    >
      <span className="">{title}</span>
      <div className="">
        {start} - {end}
      </div>
    </div>
  )
}

ShiftContent.propTypes = {
  end: PropTypes.string,
  onEditClick: PropTypes.func,
  start: PropTypes.string,
}
