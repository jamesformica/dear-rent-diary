import moment from 'moment'

import { getParagraph } from './sentences'

const statuses = {
  WAITING: 'WAITING',
  TYPING: 'TYPING',
  COUNTDOWN: 'COUNTDOWN',
  PROCESSING: 'PROCESSING',
}

const resetCurrent = () => ({
  dateTime: moment().format('MMMM Do YYYY, h:mm a'),
  sentences: getParagraph(),
  fillers: [],
})

const initialState = {
  status: statuses.WAITING,
  previous: [],
  current: resetCurrent(),
  image: null,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BEGIN_WAITING': {
      const newState = { ...state, status: statuses.WAITING }
      const current = { ...newState.current }
      newState.current = resetCurrent()
      newState.previous = [...newState.previous, current]
      return newState
    }
    case 'BEGIN_TYPING':
      return { ...state, status: statuses.TYPING }
    case 'BEGIN_COUNTDOWN':
      return { ...state, image: null, status: statuses.COUNTDOWN }
    case 'BEGIN_PROCESSING':
      return { ...state, image: action.payload, status: statuses.PROCESSING }
    case 'SUBMIT_FILLER': {
      const newState = { ...state }
      newState.current.fillers.push(action.payload)
      newState.status = statuses.TYPING

      return newState
    }
    default:
      return { ...state }
  }
}

export default rootReducer
