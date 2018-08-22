import { combineReducers } from 'redux'
import nameReducer from './nameReducer'

export default combineReducers({
  userName: nameReducer,
})
