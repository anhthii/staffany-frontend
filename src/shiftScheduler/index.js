import React, { useEffect, useReducer, useContext } from 'react'
import { fetchCurrentWeek, createShift, updateShift, deleteShift } from './api'

import dayjs from 'dayjs'
import WeekDateColumn from './components/WeekDateColumn'
import HourColumn from './components/HourColumn'

import shiftReducer from './reducer'
import * as actions from './actions'
import { getDayName } from '../utils/day'
import { getUserID } from '../utils/user'
import findIndex from 'lodash.findindex'

const initialState = {}
export default function ShiftScheduler() {
  const [state, dispatch] = useReducer(shiftReducer, initialState)

  useEffect(() => {
    fetchCurrentWeek(getUserID())
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
    const shift = findShiftByID(state, id, date)
    shift.startQuarter = numQuarter
    updateShift(shift)
      .then(() => dispatch(actions.resizeShift(id, date, numQuarter)))
      .catch((e) => console.log(e))
  }

  const addShift = (shift) => {
    createShift(shift, state.week_id)
      .then(({ data }) => {
        shift.id = data.shift_id
        dispatch(actions.addShift(shift, shift.date))
      })
      .catch((e) => console.log(e))
  }

  const findShiftByID = (state, id, date) => {
    const shifts = state.dates[date].shifts
    const index = findIndex(shifts, { id })
    const shift = shifts[index]
    return { ...shift }
  }

  const updateShiftPosition = (id, date, startQuarter) => {
    const shift = findShiftByID(state, id, date)
    shift.startQuarter = startQuarter
    updateShift(shift)
      .then(() => dispatch(actions.updateShiftPosition(id, date, startQuarter)))
      .catch((e) => console.log(e))
  }

  const deleteShiftHandler = (id, date) => {
    deleteShift(id, id).then(() => dispatch(actions.deleteShift(id, date)))
  }

  const updateShiftContent = (shift, id, date) => {
    updateShift(shift)
      .then(() => dispatch(actions.updateShiftContent(shift, id, date)))
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
            onShiftResize={resizeShift}
            onShiftDrag={updateShiftPosition}
            onShiftUpdate={updateShiftContent}
            onShiftDelete={deleteShiftHandler}
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
