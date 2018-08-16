import moment from 'moment'

import { getParagraph } from './sentences'

const statuses = {
  WAITING: 'WAITING',
  TYPING: 'TYPING',
  COUNTDOWN: 'COUNTDOWN',
  PROCESSING: 'PROCESSING',
}

const resetCurrent = () => ({
  dateTime: moment().format('MMMM Do YYYY [at] h:mm a'),
  sentences: getParagraph(),
  fillers: [],
  images: [],
})

const initialState = {
  status: statuses.WAITING,
  previous: [],
  current: resetCurrent(),
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
      return { ...state, status: statuses.COUNTDOWN }
    case 'BEGIN_PROCESSING':
      return { ...state, status: statuses.PROCESSING }
    case 'SUBMIT_FILLER': {
      const newState = { ...state }
      newState.current.fillers = [...newState.current.fillers, action.payload.filler]
      newState.current.images = [...newState.current.images, action.payload.src]
      newState.status = statuses.TYPING
      return newState
    }
    default:
      return { ...state }
  }
}

export default rootReducer
