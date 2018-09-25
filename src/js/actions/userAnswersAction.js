// @flow
import { USER_ANSWERS } from "./types";
import type { Answers } from "../flow/types.d";

export type UserAnswersAction = {
  type: string,
  payload: Answers,
};

export const addUserAnswers = (answers: Answers) => (
  dispatch: UserAnswersAction => void
) =>
  dispatch({
    type: USER_ANSWERS.ADD,
    payload: answers,
  });
