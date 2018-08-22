import NEW_NAME from '../actions/types'

const initialState = {
  new_name: '',
}

export default function (state = initialState, action) {
  switch(action.type) {
    case NEW_NAME:
      return {
        ...state,
        new_name: action.payload,
      }
    default:
    return state
  }
}
