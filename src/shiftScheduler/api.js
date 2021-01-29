import axios from 'axios'
import { API_PREFIX } from './constant'

// fetchCurrentWeek return the current week, all of the dates of the week and
// all the shifts for each date

const fetchCurrentWeek = (userID) => {
  const currentWeekURL = `${API_PREFIX}/weeks/current_week/${userID}`
  return axios.get(currentWeekURL)
}

const createShift = (params, weekID) => {
  const createShiftURL = `${API_PREFIX}/weeks/${weekID}/shifts`

  // recreate params for better readability
  return axios.post(createShiftURL, {
    date_id: params.date_id || 0,
    date: params.date,
    user_id: params.user_id,
    quarter_start: params.quarter_start,
    num_quarter: params.num_quarter,
    title: params.title,
    description: params.description,
  })
}

const updateShift = (params) => {
  const updateShiftURL = `${API_PREFIX}/shifts/${params.id}`

  return axios.put(updateShiftURL, {
    date_id: params.date_id,
    date: params.date,
    user_id: params.user_id,
    quarter_start: params.quarter_start,
    num_quarter: params.num_quarter,
    title: params.title,
    description: params.description,
  })
}

const deleteShift = (params, shiftID) => {
  const deleteShiftURL = `${API_PREFIX}/shifts/${shiftID}`
  return axios.delete(deleteShiftURL)
}

export { fetchCurrentWeek, createShift, updateShift, deleteShift }
