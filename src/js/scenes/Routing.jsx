// @flow
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import Quiz from "./Quiz";
import Results from "./Results";
// import AppWrapper from "../HOC/AppWrapper";
import { addUserName, addUserAnswers } from "../actions/userAction";

type Props = {
  userName: string,
  userAnswers: Array<string>,
};

const Routing = (props: Props) => {
  const { userName, userAnswers } = props;
  const quizClassDisabled = userName ? "" : "disabled";
  const resultsClassDisabled =
    userName && userAnswers.length !== 0 ? "" : "disabled";

  const checkUserName = () => {
    if (userName && userAnswers.length !== 0) {
      return <Results />;
    } else if (userName && userAnswers.length === 0) {
      return <Redirect to="/quiz" />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <Router>
      <div>
        <div className="routing">
          <nav className="routing__nav">
            <div className="container routing__nav-container">
              <NavLink
                className="routing__nav-link"
                exact
                activeClassName="active"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={`routing__nav-link ${quizClassDisabled}`}
                to="/quiz"
              >
                Quiz
              </NavLink>
              <NavLink
                className={`routing__nav-link ${resultsClassDisabled}`}
                to="/results"
              >
                Results
              </NavLink>
            </div>
          </nav>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/quiz"
            render={() => (userName ? <Quiz /> : <Redirect to="/" />)}
          />
          <Route path="/results" render={() => checkUserName()} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  userName: state.user.name,
  userAnswers: state.user.answers,
});

export default connect(
  mapStateToProps,
  { addUserName, addUserAnswers }
)(Routing);
