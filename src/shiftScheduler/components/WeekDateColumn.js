import React from 'react'
import PropTypes from 'prop-types'
import { QUARTER_HEIGHT } from '../constant'
import Shift from './Shift'

function WeekDateColumn({ data, date, resizeShift }) {
  const createShift = (e) => {
    // get distance form the week date column to the top
    const top = e.target.offsetTop

    const hourHeight = QUARTER_HEIGHT * 4
    // calculate current hour from the current mouse click position
    const hour = Math.floor((e.clientY - top) / hourHeight)

    const shift = {
      hour: hour,
      // for example: hour - 0 => currentQuarter 1
      // hour - 1 => currentQuarter 5
      currentQuarter: hour * 4,
      height: 80,
      title: 'Default title',
      description: '',
    }

    // console.log('block', block)

    // const currDate = getCurrentDate()
    // const currDateArr = dates[currDate]

    // setDates({ ...dates, [currDate]: [...currDateArr, block] })
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
            onResize={(numQuarter) => {
              resizeShift(shift.id, date, numQuarter)
            }}
          />
        ))}
    </div>
  )
}

WeekDateColumn.propTypes = {}

export default WeekDateColumn
