import {
  TYPE_ADD_SHIFT,
  TYPE_SET_CURRENT_WEEK,
  TYPE_RESIZE_SHIFT,
  TYPE_UPDATE_SHIFT_POSITION,
  TYPE_UPDATE_SHIFT,
  TYPE_DELETE_SHIFT,
} from './constant'

import {
  generateWeekDates,
  getDayName,
  getDateStringFromInt,
} from '../utils/day'

export function setCurrentWeek(data) {
  return {
    type: TYPE_SET_CURRENT_WEEK,
    weekDates: generateWeekDates(data.start_date),
    week_id: data.id,
    dates: data.dates.reduce((acc, date) => {
      acc[getDateStringFromInt(date.date)] = date
      return acc
    }, {}),
  }
}

export function resizeShift(id, date, numQuarter) {
  return {
    type: TYPE_RESIZE_SHIFT,
    id,
    date,
    numQuarter,
  }
}

export function updateShiftContent(shift, id, date) {
  return { type: TYPE_UPDATE_SHIFT, shift, id, date }
}

export function updateShiftPosition(id, date, quarterStart) {
  return { type: TYPE_UPDATE_SHIFT_POSITION, id, date, quarterStart }
}

export function addShift(date, dateObj) {
  return { type: TYPE_ADD_SHIFT, date, dateObj }
}

export function deleteShift(id, date) {
  return { type: TYPE_DELETE_SHIFT, id, date }
}
