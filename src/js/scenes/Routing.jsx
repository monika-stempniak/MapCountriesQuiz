// @flow
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home'
import Quiz from './Quiz'
import Results from './Results'
import AppWrapper from '../HOC/AppWrapper'
import addUserName from '../actions/userAction'


type Props = {
  userName: string;
}

const Routing = (props: Props) => {

  const { userName } = props
  const disabledClass = userName ? '' : 'links-link--disabled'

  return (
    <Router>
      <div className="routing">
        <nav className="links">
          <NavLink className="links-link" exact activeClassName="active" to="/">Home</NavLink>
          <NavLink className={`links-link ${disabledClass}`} to="/quiz">Quiz</NavLink>
          <NavLink className={`links-link ${disabledClass}`} to="/results">Results</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={AppWrapper(Home)} />
          <Route
            path="/quiz"
            render={() => (
              userName
              ? <Quiz />
              : <Redirect to="/" />
            )}
          />
          <Route
            path="/results"
            render={() => (
              userName
              ? <Results />
              : <Redirect to="/" />
            )}
          />
        </Switch>
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  userName: state.user.name,
})

export default connect(mapStateToProps, { addUserName })(Routing)
