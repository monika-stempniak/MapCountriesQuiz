import NEW_NAME from './types'

const addName = (name) => dispatch => (
  dispatch({
    type: NEW_NAME,
    payload: name,
  })
)

export default addName
