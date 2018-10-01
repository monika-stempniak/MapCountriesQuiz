// @flow
import { SHOW_SNACKBAR } from "./types";
import type { SnackbarMessage } from "../flow/types.d";

export type SnackbarAction = {
  type: string,
  payload: SnackbarMessage,
};

export const showSnackbarMessage = (
  messageContent: string,
  messageType: string
) => (dispatch: SnackbarAction => void) => {
  const message = {
    content: messageContent,
    type: messageType,
  };
  console.log("messageContent:", messageContent, "messageType:", messageType);
  switch (messageType) {
    case "success":
      dispatch({
        type: SHOW_SNACKBAR.POSITIVE,
        payload: message,
      });
      break;
    case "failure":
      dispatch({
        type: SHOW_SNACKBAR.NEGATIVE,
        payload: message,
      });
      break;
  }
};
