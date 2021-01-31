import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { QUARTER_HEIGHT } from '../constant'
import Shift from './Shift'
import { getUserID } from '../../utils/user'
function WeekDateColumn({
  data,
  date,
  onShiftResize,
  onShiftDrag,
  onShiftUpdate,
  onShiftDelete,
  onClick,
}) {
  const createShift = (e) => {
    // get distance form the week date column to the top
    const rect = e.target.getBoundingClientRect()
    const y = e.clientY - rect.top

    const hourHeight = QUARTER_HEIGHT * 4
    // calculate current hour from the current mouse click position
    const hour = Math.floor(y / hourHeight)
    const params = {
      // for example: hour - 0 => currentQuarter 1
      // hour - 1 => currentQuarter 5
      date,
      date_id: data ? data.id : 0,
      user_id: getUserID(),
      quarter_start: hour * 4,
      num_quarter: 4,
      title: 'Default title',
      description: '',
    }

    onClick(params)
  }

  return (
    <div
      className="flex-1 border-solid flex flex-col day relative"
      onMouseDown={createShift}
    >
      {data &&
        data.shifts.map((shift) => (
          <Shift
            key={shift.id}
            data={shift}
            onResize={onShiftResize}
            onDrag={onShiftDrag}
            onUpdate={onShiftUpdate}
            onDelete={onShiftDelete}
            date={date}
          />
        ))}
    </div>
  )
}

WeekDateColumn.propTypes = {}

export default WeekDateColumn
