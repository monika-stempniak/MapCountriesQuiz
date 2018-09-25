import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import countriesReducer from "./countriesReducer";
import userAnswersReducer from "./userAnswersReducer";

export default combineReducers({
  user: userDataReducer,
  countries: countriesReducer,
  results: userAnswersReducer,
});
