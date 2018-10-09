// @flow
import * as React from "react";
import Map from "./Map";
import Topbar from "./Topbar";
import countries from "../helpers/countries";
import Snackbar from "../components/Snackbar";

type Props = {};

type State = {
  userAnswer: string,
};

class Quiz extends React.Component<Props, State> {
  state = {
    userAnswer: "",
  };

  handleClick = (countryId: string) => {
    this.setState({
      userAnswer: countryId,
    });
  };

  render() {
    const { userAnswer } = this.state;

    return (
      <div className="quiz">
        <Topbar answer={userAnswer} />
        <Map clickMap={this.handleClick} countries={countries} />
        <Snackbar />
      </div>
    );
  }
}

export default Quiz;
