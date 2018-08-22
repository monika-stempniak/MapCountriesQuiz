import NEW_USER_NAME from './types'

const addName = (name) => dispatch => (
  dispatch({
    type: NEW_USER_NAME,
    payload: name,
  })
)

export default addName
