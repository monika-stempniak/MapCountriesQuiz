import { USER_NAME, USER_RESULTS } from '../actions/types'

const initialState = {
  name: '',
  results: [],
  answers: [],
}

export default function (state = initialState, action) {
  switch(action.type) {
    case USER_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case USER_RESULTS:
      return {
        ...state,
        results: action.payload,
      }
    default:
    return state
  }
}
