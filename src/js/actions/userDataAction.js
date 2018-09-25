// @flow
import { USER_NAME } from "./types";

export type UserNameAction = {
  type: string,
  payload: string,
};

export const addUserName = (name: string) => (
  dispatch: UserNameAction => void
) =>
  dispatch({
    type: USER_NAME.ADD,
    payload: name,
  });
