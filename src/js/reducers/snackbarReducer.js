// @flow
import type { SnackbarAction } from "../actions/snackbarAction";
import type { SnackbarMessage } from "../flow/types.d";
import { SHOW_SNACKBAR } from "../actions/types";

type State = {
  message: SnackbarMessage,
};

const initialState: State = {
  message: {
    content: "",
    type: "",
  },
};

export default function(
  state: State = initialState,
  action: SnackbarAction
): State {
  switch (action.type) {
    case SHOW_SNACKBAR.POSITIVE:
      return {
        ...state,
        message: action.payload,
      };
    case SHOW_SNACKBAR.NEGATIVE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
