// @flow

type userDataType = {
  ADD: string,
};

type userAnswersType = {
  ADD: string,
};

type countriesType = {
  GET: string,
};

type snackbarType = {
  POSITIVE: string,
  NEGATIVE: string,
};

export const USER_NAME: userDataType = {
  ADD: "USER_NAME:ADD",
};

export const USER_ANSWERS: userAnswersType = {
  ADD: "USER_ANSWERS:ADD",
};

export const FETCH_COUNTRIES: countriesType = {
  GET: "FETCH_COUNTRIES:GET",
};

export const SHOW_SNACKBAR: snackbarType = {
  POSITIVE: "SHOW_SNACKBAR:POSITIVE",
  NEGATIVE: "SHOW_SNACKBAR:NEGATIVE",
};
