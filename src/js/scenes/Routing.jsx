import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom'
import Home from './Home'
import Quiz from './Quiz'
import Results from './Results'


const Links = () => (
  <nav className="links">
    <NavLink className="links-link" exact activeClassName="active" to="/">Home</NavLink>
    <NavLink className="links-link" to="/quiz">Quiz</NavLink>
    <NavLink className="links-link" to="/results">Results</NavLink>
  </nav>
)

const Routing = () => (
  <Router>
    <div>
      <Links />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/results" component={Results} />
      </Switch>
    </div>
  </Router>
)

export default Routing
