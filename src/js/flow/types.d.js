// @flow
export type Countries = {
  flag: string,
  name: string,
  alpha2Code: string,
  capital: string,
  region: string,
  subregion: string,
};

export type Answers = {
  code: string,
  answer: boolean,
};

export type SnackbarMessage = {
  content: string,
  type: string,
};
