import { USER_NAME, USER_RESULTS } from './types'

export const addUserName = (name) => dispatch => (
  dispatch({
    type: USER_NAME,
    payload: name,
  })
)

export const addUserResults = (results) => dispatch => {
  return dispatch({
    type: USER_RESULTS,
    payload: results,
  })
}
