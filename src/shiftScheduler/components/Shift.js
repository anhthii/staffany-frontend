import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Rnd } from 'react-rnd'
import { QUARTER_HEIGHT } from '../constant'
import ShiftContent from './ShiftContent'
import ShiftModal from './ShiftModal'

function Shift({ data: { num_quarter, quarter_start, shift_id }, onResize }) {
  const onDrag = (e) => e.stopPropagation()
  const onDragStart = (e) => e.stopPropagation()
  const [showModal, setShowModal] = useState(false)

  const handleOnResize = (e, direction, ref, delta, position, id) => {
    const height = Number(ref.style.height.replace('px', ''))
    const numQuarter = height / QUARTER_HEIGHT
    onResize(numQuarter)
  }

  return (
    <Rnd
      minHeight={20}
      default={{
        width: '100%',
        x: 0,
        y: quarter_start * QUARTER_HEIGHT,
      }}
      data-tag={shift_id}
      onDrag={onDrag}
      enableResizing={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResize={(e, direction, ref, delta, position) => {
        handleOnResize(e, direction, ref, delta, position, shift_id)
      }}
      allowAnyClick={true}
      size={{ height: num_quarter * QUARTER_HEIGHT, width: '100%' }}
      onDragStart={onDragStart}
      //   onDragStop={(e, d) => handleOnDragStop(e, d, block.id)}
      resizeGrid={[10, 20]}
      dragGrid={[10, 20]}
      dragAxis="y"
      bounds=".day"
    >
      <ShiftModal show={showModal} onClose={() => setShowModal(0)} />
      <ShiftContent
        start={''}
        end={''}
        onEditClick={() => setShowModal(true)}
      />
    </Rnd>
  )
}

Shift.propTypes = {
  quarterStart: PropTypes.number.isRequired,
  numQuarter: PropTypes.number.isRequired,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default Shift
