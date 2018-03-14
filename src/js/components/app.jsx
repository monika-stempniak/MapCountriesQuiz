import React from 'react';
import { Map } from './map.jsx';
import { Topbar } from './topbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      userAnswer: ""
    }
  }

  handleClick = (answer) => {
    console.log(answer)
    this.setState({
      userAnswer: answer
    })
  }

  render() {
    return (
      <div>
        <Topbar answer={this.state.userAnswer}/>
        <Map clickMap={this.handleClick}/>
      </div>
    )
  }
}

export { App };

