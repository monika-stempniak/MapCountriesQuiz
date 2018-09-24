// @flow
import { USER_NAME } from "../actions/types";
import type { UserNameAction } from "../actions/userDataAction";

type State = {
  name: string,
};

const initialState: State = {
  name: "",
};

export default function(
  state: State = initialState,
  action: UserNameAction
): State {
  switch (action.type) {
    case USER_NAME.ADD:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
