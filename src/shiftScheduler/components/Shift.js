import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Rnd } from 'react-rnd'
import { QUARTER_HEIGHT } from '../constant'
import ShiftContent from './ShiftContent'
import { endTime, startTime } from '../../utils/time'
import debounce from 'lodash.debounce'

function Shift({ data, onResize, onDrag, setModalData, showModal, date }) {
  const handleOnDrag = (e) => {
    setMoving(true)
    // stopPropagation to prevent click event from triggering on the weekDateColumn component
    e.stopPropagation()
  }

  const onDragStart = (e) => {
    e.stopPropagation()
  }

  const [moving, setMoving] = useState(false)

  const handleOnResize = (e, direction, ref, delta, position, id) => {
    setMoving(true)
    const height = Number(ref.style.height.replace('px', ''))
    const numQuarter = height / QUARTER_HEIGHT
    onResize(id, date, numQuarter)
  }

  const debounceResize = useCallback(
    debounce(handleOnResize, 100),
    [] // will be created only once initially
  )

  const handleOnDragStop = (e, d, id) => {
    if (!moving) {
      return
    }

    const currentQuarter = Math.floor(d.lastY / QUARTER_HEIGHT)

    onDrag(id, date, currentQuarter)
    e.stopPropagation()
  }

  const handleOnClick = (e) => {
    if (moving) {
      // dragging event ignore
    } else {
      setModalData(data)
      showModal()
    }

    setMoving(false)
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
        debounceResize(e, direction, ref, delta, position, id)
      }}
      onClick={handleOnClick}
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
      <ShiftContent
        title={title}
        start={startTime(quarter_start)}
        end={endTime(quarter_start, num_quarter)}
      />
    </Rnd>
  )
}

Shift.propTypes = {}

export default Shift
