import React, { useEffect, useReducer } from 'react'
import { fetchCurrentWeek, createShift } from './api'

import dayjs from 'dayjs'
import WeekDateColumn from './components/WeekDateColumn'
import HourColumn from './components/HourColumn'
import shiftReducer from './reducer'
import * as actions from './actions'
import { getDayName } from '../utils/day'

const initialState = {}
export default function ShiftScheduler() {
  const [state, dispatch] = useReducer(shiftReducer, initialState)

  useEffect(() => {
    fetchCurrentWeek(1)
      .then(({ data }) => {
        dispatch(actions.setCurrentWeek(data))
      })
      // bad error handling
      .catch((err) => console.log(err))
  }, [])

  if (!state.weekDates) {
    return <h1>loading...</h1>
  }

  const resizeShift = (id, date, numQuarter) => {
    dispatch(actions.resizeShift(id, date, numQuarter))
  }

  const addShift = (shift) => {
    createShift(shift, state.week_id)
      .then(({ data }) => {
        shift.id = data.shift_id
        dispatch(actions.addShift(shift, shift.date))
      })
      .catch((e) => console.log(e))
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-1  h-1/6">Date</div>
        {state.weekDates.map((date) => (
          <DateLabel key={date} date={date} />
        ))}
      </div>
      <div className="flex flex-row top-level">
        <HourColumn />
        {state.weekDates.map((date) => (
          <WeekDateColumn
            key={date}
            date={date}
            data={state.dates[date]}
            resizeShift={resizeShift}
            onClick={addShift}
          />
        ))}
      </div>
    </div>
  )
}

function DateLabel({ date }) {
  const day = dayjs(date)
  return (
    <div key={date} className="flex-1 h-1/6">
      {day.date()} {getDayName(date)}
    </div>
  )
}
