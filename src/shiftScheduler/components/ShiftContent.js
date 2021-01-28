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
      }}
    >
      This is a tile
    </div>
  )
}

ShiftContent.propTypes = {
  end: PropTypes.any,
  onEditClick: PropTypes.func,
  start: PropTypes.any,
}
