import { USER_NAME, USER_ANSWERS, FETCH_COUNTRIES } from "./types";
import getRandomNumber from "../helpers/getRandomNumber";
// import mock from "./testMock";

export const addUserName = name => dispatch =>
  dispatch({
    type: USER_NAME,
    payload: name,
  });

export const addUserAnswers = answers => dispatch =>
  dispatch({
    type: USER_ANSWERS,
    payload: answers,
  });

function setCountries(countries, dispatch) {
  const excludedCountries = ["AQ", "UM"];
  const arrayLength = 3;
  let arrayOfCountries = [];
  for (let i = 0; i < arrayLength; i++) {
    let randomNumber = getRandomNumber(countries);
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
    type: FETCH_COUNTRIES,
    payload: arrayOfCountries,
  });
}

export const fetchCountries = region => dispatch => {
  const url =
    "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;capital;region;subregion;flag";
  // const url = "";

  // setCountries(mock, dispatch);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("A connection error has occurred!");
      }
    })
    .then(countries => {
      if (region === "All regions") {
        setCountries(countries, dispatch);
        console.log("All", countries);
      } else {
        const filteredCountries = countries.filter(
          country => country.region === region
        );
        console.log("Region", filteredCountries);
        setCountries(filteredCountries, dispatch);
      }
    })
    .catch(error => console.dir("Error: ", error)); // eslint-disable-line no-console
};
