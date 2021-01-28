import React from 'react'
import PropTypes from 'prop-types'
import { QUARTER_HEIGHT } from '../constant'
import Shift from './Shift'

function WeekDateColumn({ data, date, resizeShift, onClick }) {
  const createShift = (e) => {
    // get distance form the week date column to the top
    console.log(date, data)
    const top = e.target.offsetTop

    const hourHeight = QUARTER_HEIGHT * 4
    // calculate current hour from the current mouse click position
    const hour = Math.floor((e.clientY - top) / hourHeight)

    const params = {
      // for example: hour - 0 => currentQuarter 1
      // hour - 1 => currentQuarter 5
      date,
      date_id: data ? data.id : 0,
      user_id: 1,
      quarter_start: hour * 4,
      num_quarter: 4,
      title: 'Default title',
      description: '',
    }

    onClick(params)

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
