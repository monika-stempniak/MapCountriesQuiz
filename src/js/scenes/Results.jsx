// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import AppWrapper from '../HOC/AppWrapper'
import Button from '../components/Button'
import { addUserName, addUserResults } from      '../actions/userAction'

type Result = {
  id: number,
  country: string,
  code: string,
  flag: string,
  capital: string,
  answer: string,
}

type Props = {
  userName: string,
  results: Array<Result>,
  history: Array<string>,
}

const Results = ({ userName, results, history }: Props) => {

  const prepareResults = () => {
    return results && results.map(result => (
      <tr key={result.id}>
        <td>{result.id}</td>
        <td>{result.country}</td>
        <td>{result.code}</td>
        <td>{result.capital}</td>
        <td>
          <img src={result.flag} alt={`${result.country}'s flag`} width='70' />
        </td>
        <td>{result.answer}</td>
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
  results: state.user.results,
})

export default connect(mapStateToProps, { addUserName, addUserResults })(withRouter(Results))
