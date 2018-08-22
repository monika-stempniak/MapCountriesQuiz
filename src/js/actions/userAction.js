import USER_NAME from './types'

const addUserName = (name) => dispatch => (
  dispatch({
    type: USER_NAME,
    payload: name,
  })
)

export default addUserName
