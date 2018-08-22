import NEW_USER_NAME from '../actions/types'

const initialState = {
  newUserName: '',
}

export default function (state = initialState, action) {
  switch(action.type) {
    case NEW_USER_NAME:
      return {
        ...state,
        newUserName: action.payload,
      }
    default:
    return state
  }
}
