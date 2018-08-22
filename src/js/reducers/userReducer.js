import USER_NAME from '../actions/types'

const initialState = {
  name: '',
}

export default function (state = initialState, action) {
  switch(action.type) {
    case USER_NAME:
      return {
        ...state,
        name: action.payload,
      }
    default:
    return state
  }
}
