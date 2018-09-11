import { USER_NAME, USER_ANSWERS, FETCH_COUNTRIES } from "../actions/types";

const initialState = {
  name: "",
  countries: [],
  answers: [],
};

function addAnswers(state, answer) {
  const copyStateAnswers = [...state.answers];
  copyStateAnswers.push(answer);

  // const copyStateAnswers = JSON.parse(JSON.strigify(state.answers))
  // copyStateAnswers.push(result);

  return {
    ...state,
    answers: copyStateAnswers,
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case USER_ANSWERS:
      return addAnswers(state, action.payload);
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
}
