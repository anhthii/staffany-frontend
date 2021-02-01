import React, { useEffect, useReducer, useContext } from 'react'
import {
  fetchCurrentWeek,
  fetchWeekByDate,
  createShift,
  updateShift,
  deleteShift,
} from './api'

import dayjs from 'dayjs'
import WeekDateColumn from './components/WeekDateColumn'
import HourColumn from './components/HourColumn'

import shiftReducer from './reducer'
import * as actions from './actions'
import {
  getDateStringFromInt,
  getDayName,
  isToday,
  getMonthName,
} from '../utils/day'
import { getUserID } from '../utils/user'
import findIndex from 'lodash.findindex'
import classnames from 'classnames'

const initialState = {}
export default function ShiftScheduler() {
  const [state, dispatch] = useReducer(shiftReducer, initialState)

  useEffect(() => {
    const start_date = localStorage.getItem('start_date')
    if (start_date) {
      const dateString = getDateStringFromInt(start_date)
      fetchWeekByDate(getUserID(), dateString)
        .then(({ data }) => {
          dispatch(actions.setCurrentWeek(data))
        })
        // bad error handling
        .catch((err) => console.log(err))
    } else {
      fetchCurrentWeek(getUserID())
        .then(({ data }) => {
          dispatch(actions.setCurrentWeek(data))
        })
        // bad error handling
        .catch((err) => console.log(err))
    }
  }, [])

  if (!state.weekDates) {
    return <h1>loading...</h1>
  }

  const resizeShift = (id, date, numQuarter) => {
    const shift = findShiftByID(state, id, date)
    shift.num_quarter = numQuarter
    // optimistic UI, update UI before call update request
    dispatch(actions.resizeShift(id, date, numQuarter))

    updateShift(shift)
      .then(() => {})
      .catch((e) => console.log(e))
  }

  const addShift = (shift) => {
    createShift(shift, state.week_id)
      // return data with newDateObj contains the created shift
      .then(({ data: { date: dateObj } }) => {
        dispatch(actions.addShift(shift.date, dateObj))
      })
      .catch((e) => console.log(e))
  }

  const findShiftByID = (state, id, date) => {
    const shifts = state.dates[date].shifts
    const index = findIndex(shifts, { id })
    const shift = shifts[index]
    return { ...shift }
  }

  const updateShiftPosition = (id, date, quarterStart) => {
    const shift = findShiftByID(state, id, date)
    shift.quarter_start = quarterStart
    updateShift(shift)
      .then(() => dispatch(actions.updateShiftPosition(id, date, quarterStart)))
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

  const nextWeek = (e) => {
    changeWeek('next')
  }

  const prevWeek = (e) => {
    changeWeek('prev')
  }

  const changeWeek = (nextOrPrev) => {
    const { start_date } = state

    const dateString = getDateStringFromInt(start_date)
    let date = dayjs(dateString)
    if (nextOrPrev == 'next') {
      date = date.add(7, 'day').format('YYYY-MM-DD')
    } else {
      date = date.add(-7, 'day').format('YYYY-MM-DD')
    }

    fetchWeekByDate(getUserID(), date)
      .then(({ data }) => {
        localStorage.setItem('start_date', data.start_date)
        dispatch(actions.setCurrentWeek(data))
      })
      // bad error handling
      .catch((err) => console.log(err))
  }

  const renderCurrentWeekRange = () => {
    const { weekDates } = state
    const start = dayjs(weekDates[0])
    const end = dayjs(weekDates[weekDates.length - 1])

    const year = end.get('year')
    const dateStart = start.get('date')
    const dateEnd = end.get('date')
    const monthStart = start.get('month')
    const monthEnd = end.get('month')

    return `${dateStart} ${getMonthName(
      monthStart
    )} - ${dateEnd} ${getMonthName(monthEnd)} ${year}`
  }

  return (
    <div>
      <div className="grid grid-cols-8">
        <div className="col-span-1"></div>
        <div className="col-span-7 flex justify-between mb-3">
          <div className="text-gray-500 flex justify-center items-center">
            <span className="text-xl block">{renderCurrentWeekRange()}</span>
            <button
              type="button"
              className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              onClick={prevWeek}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width={20}
                height={20}
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              type="button"
              className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              onClick={nextWeek}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width={20}
                height={20}
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row mb-5">
        <div className="flex-1  h-1/6"></div>
        {state.weekDates.map((date) => (
          <DateLabel key={date} date={date} isToday={isToday(date)} />
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

function DateLabel({ date, isToday }) {
  const day = dayjs(date)
  return (
    <div
      key={date}
      className="flex-1 h-full flex justify-center flex-col items-center text-gray-500"
    >
      <div>{getDayName(date)}</div>
      <div
        className={classnames(
          'rounded-full h-10 w-10 my-2 flex justify-center items-center  bg-gray-200',
          { 'bg-blue-500 text-white': isToday },
          { 'text-gray-500': !isToday }
        )}
      >
        {day.date()}
      </div>
    </div>
  )
}
