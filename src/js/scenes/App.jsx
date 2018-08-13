// @flow
import * as React from 'react'
import { Map } from './Map.jsx'
import { Topbar }  from './Topbar.jsx'
import { countries } from '../auxiliaryArrays/countries.js'

type State = {
  userAnswer: string,
}

type Props = {}

type Country = {id:string, title: string, d: string}

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
    return (
      <div>
        <Topbar
          answer={this.state.userAnswer}
          // listId={this.prepareListOfCountriesId(countries)}
        />
        <Map clickMap={this.handleClick} countries={countries}/>
      </div>
    )
  }
}

export { App }
