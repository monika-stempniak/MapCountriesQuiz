// @flow
import { FETCH_COUNTRIES } from "./types";
import getRandomNumber from "../helpers/getRandomNumber";
import type { Countries } from "../flow/types.d";

export type CountriesAction = {
  type: string,
  payload: {
    snackbar: {
      message: string,
      status: string,
    },
    countries: Array<Countries>,
  },
};

function setCountries(
  message: string,
  status: string,
  countries: Countries,
  dispatch: CountriesAction => void
) {
  const excludedCountries: Array<string> = ["AQ", "UM"];
  const arrayLength: number = 3;
  let arrayOfCountries: Array<Countries> = [];
  for (let i = 0; i < arrayLength; i++) {
    let randomNumber = getRandomNumber((countries: Countries));
    let randomCountry = countries[randomNumber];
    if (excludedCountries.indexOf(randomCountry.alpha2Code) !== -1) {
      randomNumber = getRandomNumber(countries);
      randomCountry = countries[randomNumber];
    }
    if (arrayOfCountries.indexOf(randomCountry) !== -1) {
      randomNumber = getRandomNumber(countries);
      randomCountry = countries[randomNumber];
    }
    arrayOfCountries.push(countries[randomNumber]);
  }
  dispatch({
    type: FETCH_COUNTRIES.GET,
    payload: {
      snackbar: {
        message,
        status,
      },
      countries: arrayOfCountries,
    },
  });
}

const fetchCountries = (region: string) => (
  dispatch: CountriesAction => void
) => {
  const url =
    "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;capital;region;subregion;flag";
  // const url = "";

  // setCountries(mock, dispatch);

  const connectionError = "A connection error has occurred!";

  const fetchedError = {
    snackbar: {
      message: connectionError,
      status: "failure",
    },
    countries: [],
  };

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({
          type: FETCH_COUNTRIES.ERROR,
          payload: fetchedError,
        });
        throw new Error(connectionError);
      }
    })
    .then(countries => {
      if (region === "All regions") {
        setCountries(
          "You've successfully chose all regions",
          "success",
          countries,
          dispatch
        );
      } else {
        const filteredCountries = countries.filter(
          country => country.region === region
        );
        setCountries(
          `You've successfully chose ${region} region`,
          "success",
          filteredCountries,
          dispatch
        );
      }
    })
    .catch(error => {
      dispatch({
        type: FETCH_COUNTRIES.ERROR,
        payload: fetchedError,
      });
      console.dir(connectionError, error);
    });
};

export default fetchCountries;
