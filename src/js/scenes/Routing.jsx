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
import addUserName from "../actions/userAction";

type Props = {
  userName: string,
};

const Routing = (props: Props) => {
  const { userName } = props;
  const disabledClass = userName ? "" : "disabled";

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
                className={`routing__nav-link ${disabledClass}`}
                to="/quiz"
              >
                Quiz
              </NavLink>
              <NavLink
                className={`routing__nav-link ${disabledClass}`}
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
          <Route
            path="/results"
            render={() => (userName ? <Results /> : <Redirect to="/" />)}
          />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  userName: state.user.name,
});

export default connect(
  mapStateToProps,
  { addUserName }
)(Routing);
