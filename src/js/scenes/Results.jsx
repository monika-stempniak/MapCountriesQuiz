// @flow
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Scoresheet from "../components/Scoresheet";
import Scores from "../components/Scores";
import Button from "../components/Button";
import Header from "../components/Header";
import {
  addUserName,
  fetchCountries,
  addUserAnswers,
} from "../actions/userAction";

// type Result = {
//   id: number,
//   country: string,
//   code: string,
//   flag: string,
//   capital: string,
//   answer: string,
// }

type Props = {
  userName: string,
  countries: Array<any>,
  userAnswers: Array<any>,
  history: Array<string>,
};

const Results = ({ userName, countries, userAnswers, history }: Props) => {
  const prepareResults = () => {
    return (
      <Scoresheet userName={userName}>
        {countries &&
          countries.map((country, i) => (
            <Scores
              key={country.alpha2Code}
              ordinalNumber={i + 1}
              country={country.name}
              code={country.alpha2Code}
              capital={country.capital}
              flag={country.flag}
              userAnswer={userAnswers[i].answer}
            />
          ))}
      </Scoresheet>
    );
  };

  const handleClickPlayAgain = () => {
    history.push("/quiz");
  };

  return (
    <div className="results">
      <Header>
        <Button
          btnClass="results__button--play"
          handleClick={handleClickPlayAgain}
        >
          Play again
        </Button>
        <h2 className="results__header">Results</h2>
      </Header>
      <section className="results__content">
        <hr />
        <div className="container">{prepareResults()}</div>
        <hr />
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  userName: state.user.name,
  countries: state.user.countries,
  userAnswers: state.user.answers,
});

export default connect(
  mapStateToProps,
  { addUserName, fetchCountries, addUserAnswers }
)(withRouter(Results));
