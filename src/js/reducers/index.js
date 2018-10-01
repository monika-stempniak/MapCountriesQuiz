import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import countriesReducer from "./countriesReducer";
import userAnswersReducer from "./userAnswersReducer";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
  user: userDataReducer,
  countries: countriesReducer,
  results: userAnswersReducer,
  snackbar: snackbarReducer,
});
