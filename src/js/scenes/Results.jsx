// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import AppWrapper from '../HOC/AppWrapper'
import Button from '../components/Button'
import { addUserName, fetchCountries, addUserAnswers } from '../actions/userAction'

// type Result = {
//   id: number,
//   country: string,
//   code: string,
//   flag: string,
//   capital: string,
//   answer: string,
// }

type Props = {
  userName: string,
  countries: Array<any>,
  userAnswers: Array<any>,
  history: Array<string>,
}

const Results = ({ userName, countries, userAnswers, history }: Props) => {

  const prepareResults = () => {
    return countries && countries.map((country, i) => (
      <tr key={country.alpha2Code}>
        <td>{i}</td>
        <td>{country.name}</td>
        <td>{country.alpha2Code}</td>
        <td>{country.capital}</td>
        <td>
          <img src={country.flag} alt={`${country.country}'s flag`} width='70' />
        </td>
        <td>{userAnswers[i].answer}</td>
      </tr>
    ))
  }

  const handleClickPlayAgain = () => {
    history.push('/quiz')
  }

  return (
    <div className="results-wrapper">
      <section className="results">
        <h1 className="results-title">Results</h1>
        <Button
          btnClass="btn btn-play"
          handleClick={handleClickPlayAgain}
        >
          Play again
        </Button>
        <div className="col-3">
          <table className="table-results">
            <caption>User: { userName }</caption>
            <thead>
              <tr>
                <th>Id</th>
                <th>Country</th>
                <th>Code</th>
                <th>Capital</th>
                <th>Flag</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              { prepareResults() }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  userName: state.user.name,
  countries: state.user.countries,
  userAnswers: state.user.answers,
})

export default connect(mapStateToProps, { addUserName, fetchCountries, addUserAnswers })(withRouter(Results))
