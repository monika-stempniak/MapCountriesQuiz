import React from 'react';
import { Map } from './map.jsx';
import { Topbar } from './topbar.jsx';
import { countries } from './countries.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      userAnswer: ""
    }
  }

  handleClick = (answer) => {
    this.setState({
      userAnswer: answer
    })
  }

  render() {

    const listId = countries.map(elem => {
      return elem.id
    })

    return (
      <div>
        <Topbar answer={this.state.userAnswer} listId={listId}/>
        <Map clickMap={this.handleClick} countries={countries}/>
      </div>
    )
  }
}

export { App };

