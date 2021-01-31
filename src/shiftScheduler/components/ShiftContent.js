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
    </div>
  )
}

ShiftContent.propTypes = {
  end: PropTypes.string,
  onEditClick: PropTypes.func,
  start: PropTypes.string,
}
