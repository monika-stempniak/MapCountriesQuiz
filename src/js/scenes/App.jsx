import React from 'react'
import { Map } from './Map.jsx'
import { Topbar }  from './Topbar.jsx'
import { countries } from '../auxiliaryArrays/countries.js'

class App extends React.Component {
  state = {
    userAnswer: '',
  }

  handleClick = (countryId) => {
    this.setState({
      userAnswer: countryId,
    })
  }

  prepareListOfCountriesId = () => {
    countries.map(country => country.id)
  }

  render() {
    return (
      <div>
        <Topbar answer={this.state.userAnswer} listId={this.prepareListOfCountriesId()}/>
        <Map clickMap={this.handleClick} countries={countries}/>
      </div>
    )
  }
}

export { App }
