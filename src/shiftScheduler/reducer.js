import * as constants from './constant'
import findindex from 'lodash.findindex'
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
        draftState.dates[action.date].shifts.push(action.shift)
      })

      return nextState
    }

    case constants.TYPE_RESIZE_SHIFT: {
      const nextState = produce(state, (draftState) => {
        const shifts = draftState.dates[action.date].shifts
        const index = findindex(shifts, { id: action.id })
        draftState.dates[action.date].shifts[index].num_quarter =
          draftState.numQuarter
      })

      return nextState
    }

    case 'decrement':
    default:
      throw new Error()
  }
}
