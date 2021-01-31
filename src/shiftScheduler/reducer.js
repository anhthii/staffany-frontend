import * as constants from './constant'
import findIndex from 'lodash.findindex'
import produce from 'immer'

export default function shiftReducer(state = {}, action) {
  switch (action.type) {
    case constants.TYPE_SET_CURRENT_WEEK: {
      return {
        weekDates: action.weekDates,
        dates: action.dates,
        week_id: action.week_id,
      }
    }

    case constants.TYPE_ADD_SHIFT: {
      const nextState = produce(state, (draftState) => {
        draftState.dates[action.date] = action.dateObj
      })

      return nextState
    }

    case constants.TYPE_RESIZE_SHIFT: {
      const nextState = produce(state, (draftState) => {
        const shifts = draftState.dates[action.date].shifts
        const index = findIndex(shifts, { id: action.id })
        draftState.dates[action.date].shifts[index].num_quarter =
          action.numQuarter
      })

      return nextState
    }

    case constants.TYPE_UPDATE_SHIFT_POSITION: {
      const nextState = produce(state, (draftState) => {
        const shifts = draftState.dates[action.date].shifts
        const index = findIndex(shifts, { id: action.id })
        draftState.dates[action.date].shifts[index].quarter_start =
          action.quarterStart
      })

      return nextState
    }

    case constants.TYPE_UPDATE_SHIFT: {
      const nextState = produce(state, (draftState) => {
        const shifts = draftState.dates[action.date].shifts
        const index = findIndex(shifts, { id: action.id })
        // overwrite old shift with new shift
        draftState.dates[action.date].shifts[index] = action.shift
      })

      return nextState
    }

    case constants.TYPE_DELETE_SHIFT: {
      const nextState = produce(state, (draftState) => {
        const shifts = draftState.dates[action.date].shifts

        const index = findIndex(shifts, { id: action.id })
        // overwrite old shift with new shift
        draftState.dates[action.date].shifts.splice(index, 1)
      })

      return nextState
    }

    default:
      throw new Error()
  }
}
