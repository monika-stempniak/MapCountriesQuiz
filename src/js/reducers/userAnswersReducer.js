// @flow
import { USER_ANSWERS } from "../actions/types";
import type { Answers } from "../flow/types.d";
import type { UserAnswersAction } from "../actions/userAnswersAction";

type State = {
  answers: Array<Answers>,
};

const initialState: State = {
  answers: [],
};

function addAnswers(state: State, answer: Answers) {
  const copyStateAnswers = [...state.answers];
  copyStateAnswers.push(answer);

  // const copyStateAnswers = JSON.parse(JSON.strigify(state.answers))
  // copyStateAnswers.push(result);

  return {
    ...state,
    answers: copyStateAnswers,
  };
}

export default function(
  state: State = initialState,
  action: UserAnswersAction
): State {
  switch (action.type) {
    case USER_ANSWERS.ADD:
      return addAnswers(state, action.payload);
    default:
      return state;
  }
}
