import {
  TYPE_ADD_SHIFT,
  TYPE_SET_CURRENT_WEEK,
  TYPE_RESIZE_SHIFT,
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

export function addShift(shift, date) {
  return { type: TYPE_ADD_SHIFT, shift, date }
}
