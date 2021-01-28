import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Rnd } from 'react-rnd'
import { QUARTER_HEIGHT } from '../constant'
import ShiftContent from './ShiftContent'
import ShiftModal from './ShiftModal'
import { endTime, startTime } from '../../utils/time'

function Shift({ data, onResize, onDrag, onUpdate, onDelete, date }) {
  const handleOnDrag = (e) => {
    e.stopPropagation()
  }
  const onDragStart = (e) => {
    e.stopPropagation()
  }
  const [showModal, setShowModal] = useState(false)

  const handleOnResize = (e, direction, ref, delta, position, id) => {
    const height = Number(ref.style.height.replace('px', ''))
    const numQuarter = height / QUARTER_HEIGHT
    onResize(id, date, numQuarter)
  }

  const handleOnDragStop = (e, d, id) => {
    e.stopPropagation()
    const currentQuarter = Math.floor(d.lastY / QUARTER_HEIGHT)
    onDrag(id, date, currentQuarter)
  }

  const { num_quarter, quarter_start, id, title, description } = data
  return (
    <Rnd
      minHeight={20}
      default={{
        width: '100%',
        x: 0,
        y: quarter_start * QUARTER_HEIGHT,
      }}
      onDrag={handleOnDrag}
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
        handleOnResize(e, direction, ref, delta, position, id)
      }}
      allowAnyClick={true}
      size={{ height: num_quarter * QUARTER_HEIGHT, width: '100%' }}
      onDragStart={onDragStart}
      onDragStop={(e, d) => handleOnDragStop(e, d, id)}
      resizeGrid={[10, 20]}
      dragGrid={[10, 20]}
      dragAxis="y"
      bounds=".day"
      onMouseUp={() => console.log('mouse up')}
    >
      <ShiftModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        description={description}
        onUpdate={(title, desc) => onUpdate({ ...data, title, desc }, id, date)}
        onDelete={() => onDelete(id, date)}
      />
      <ShiftContent
        title={title}
        start={startTime(quarter_start)}
        end={endTime(quarter_start, num_quarter)}
        onEditClick={() => setShowModal(true)}
      />
    </Rnd>
  )
}

Shift.propTypes = {}

export default Shift
