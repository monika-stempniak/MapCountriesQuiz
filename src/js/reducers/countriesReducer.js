// @flow
import { FETCH_COUNTRIES } from "../actions/types";
import type { Countries } from "../flow/types.d";
import type { CountriesAction } from "../actions/countriesAction";

type State = {
  fetched: {
    snackbar: {
      message: string,
      status: string,
    },
    countries: Array<Countries>,
  },
};

const initialState: State = {
  fetched: {
    snackbar: {
      message: "",
      status: "",
    },
    countries: [],
  },
};

export default function(
  state: State = initialState,
  action: CountriesAction
): State {
  switch (action.type) {
    case FETCH_COUNTRIES.GET:
      return {
        ...state,
        fetched: action.payload,
      };
    case FETCH_COUNTRIES.ERROR:
      return {
        ...state,
        fetched: action.payload,
      };
    default:
      return state;
  }
}
