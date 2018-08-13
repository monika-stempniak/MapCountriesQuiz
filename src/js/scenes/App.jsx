// @flow
import * as React from 'react'
import Map from './Map'
import Topbar  from './Topbar'
import countries from '../auxiliaryArrays/countries'

type State = {
  userAnswer: string,
}

type Props = {}

// type Country = {id: string, title: string, d: string}

class App extends React.Component<Props, State> {
  state = {
    userAnswer: '',
  }

  handleClick = (countryId: string) => {
    this.setState({
      userAnswer: countryId,
    })
  }

  // prepareListOfCountriesId = (countries: Array<Country>) : Array<string>  => {
  //   return countries.map(country => country.id)
  // }

  render() {
    const {userAnswer} = this.state

    return (
      <div>
        <Topbar
          answer={userAnswer}
          // listId={this.prepareListOfCountriesId(countries)}
        />
        <Map clickMap={this.handleClick} countries={countries} />
      </div>
    )
  }
}

export default App
