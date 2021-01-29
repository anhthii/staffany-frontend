import axios from 'axios'
import { API_PREFIX } from '../shiftScheduler/constant'

// fetchCurrentWeek return the current week, all of the dates of the week and
// all the shifts for each date

const Login = (username, password) => {
  const LoginURL = `${API_PREFIX}/users/login`

  // recreate params for better readability
  return axios.post(LoginURL, {
    username,
  })
}

export { Login }
