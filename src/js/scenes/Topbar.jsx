// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Timer from '../components/Timer'
import Button from '../components/Button'
import { addUserName, addUserResults } from '../actions/userAction'

type Result = {
  id: number,
  country: string,
  code: string,
  flag: string,
  capital: string,
  answer?: string,
}

type Answer = {
  code: string,
  answer: string,
}

type State = {
  countryCode: string,
  countryName: string,
  flag: string,
  capital: string,
  good: number,
  bad: number,
  counter: number,
  isStartClicked: boolean,
  isHintLinkVisible: boolean,
  isHintVisible: boolean,
  hintMessage: string,
  isTimeOut: boolean,
  results: Array<Result>,
  answers: Array<Answer>,
}

type Props = {
  answer: string,
  userName: string,
  addUserResults: (results: Array<Result>) => () => ({
    type: string,
    payload: Array<Result>,
  }),
  history: Array<string>,
}

class Topbar extends React.Component<Props,State> {
  state = {
    countryCode: '',
    countryName: '',
    flag: 'http://via.placeholder.com/150x80?text=COUNTRY+FLAG',
    capital: '',
    good: 0,
    bad: 0,
    counter: 0,
    isStartClicked: false,
    isHintLinkVisible: false,
    isHintVisible: false,
    hintMessage: '',
    isTimeOut: false,
    results: [],
    answers: [],
  }

  getTimer = (timeOut: boolean) => {
    this.setState({
      isTimeOut: timeOut,
    })
  }

  getResults = (result: Result) => {
    const { results } = this.state
    let combineResults = [...results, result]
    this.setState({
      results: combineResults,
    })
  }

  getAnswers = (answer: Answer) => {
    const { answers } = this.state
    let combineAnswers = [...answers, answer]
    this.setState({
      answers: combineAnswers,
    })
  }

  pushResultsAndAnswers = () => {
    const {
      counter,
      isTimeOut,
      results,
      answers,
    } = this.state
    const { addUserResults, history } = this.props
    if (counter >= 4 || isTimeOut === true) {
      let scores = results.map(result => {
        answers.forEach(answer => {
          if (result.code === answer.code) {
              result.answer = answer.answer
            }
          })
        return result
      })

      addUserResults(scores)

      history.push('/results')

      this.setState({
        countryCode: '',
        countryName: '',
        flag: 'http://via.placeholder.com/150x80?text=COUNTRY+FLAG',
        capital: '',
        good: 0,
        bad: 0,
        counter: 0,
        isStartClicked: false,
        isHintLinkVisible: false,
        isHintVisible: false,
        hintMessage: '',
        isTimeOut: false,
      })
    }
  }

  hintTimer = () => setTimeout(() => {
    this.setState({
      isHintVisible: false,
    })
  }, 1000)

  handleClickStart = () => {
    const { isTimeOut, counter } = this.state
    if (isTimeOut !== true || counter <= 3) {
      this.fetchData()
    }
  }

  fetchData = () => {
    const { counter,
      capital,
      countryName,
      countryCode,
      flag,
    } = this.state
    const url = 'https://restcountries.eu/rest/v2/all'
    fetch(url)
      .then( response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('A connection error has occurred!')
        }
      })
      .then( countries => {
        const excludedCountries = ['AQ', 'UM']
        let randomNumber = Math.floor(Math.random() * countries.length)
        if (excludedCountries.indexOf(countries[randomNumber].alpha2Code) !== -1) {
          randomNumber = Math.floor(Math.random() * countries.length)
        }
        this.setState({
          countryName: countries[randomNumber].name,
          countryCode: countries[randomNumber].alpha2Code,
          flag: countries[randomNumber].flag,
          capital: countries[randomNumber].capital,
          counter: counter + 1,
          isStartClicked: true,
          isHintLinkVisible: true,
        }, () => {
          this.setState({
            hintMessage: `Capital: ${capital}`,
          })

          if (counter > 0) {

            this.getResults({
              id: counter,
              country: countryName,
              code: countryCode,
              flag,
              capital,
            })
          }
        })
      })
      .catch(error => console.dir('Error: ', error)) // eslint-disable-line no-console
  }

  handleClickHint = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({
      isHintVisible: true,
    })
    this.hintTimer()
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { isStartClicked, countryCode, good, bad } = this.state
    const { answer } = this.props
    if (isStartClicked) {
      if (nextProps.answer === countryCode && answer !== nextProps.answer) {
        this.setState({
          good: good + 1,
        }, () => this.getAnswers({
          code: countryCode,
          answer: 'good',
        }))
      } else {
        this.setState({
          bad: bad + 1,
        },() => this.getAnswers({
          code: countryCode,
          answer: 'bad',
        }))
      }
      this.handleClickStart()
      this.pushResultsAndAnswers()
    }
  }

  render() {
    const {
      counter,
      isHintLinkVisible,
      isHintVisible,
      hintMessage,
      flag,
      countryName,
      isStartClicked,
      good,
      bad,
    } = this.state

    const { userName } = this.props

    const hintLinkVisibility = isHintLinkVisible ? 'isVisible' : ''
    const hintVisibility = isHintVisible ? 'isVisible' : ''

    return (
      <section className="topbar">
        <Header section="topbar">
          Map Countries Quiz
        </Header>
        <div className="topbar-content">
          <div className="col-3">
            <h3 className="quiz-question">
              <span className="quiz-user">{userName}, </span>
              which country the flag belongs to?
            </h3>
            <div className="quiz-row">
              <Button
                btnClass={`btn-quiz-hint ${hintLinkVisibility}`}
                handleClick={this.handleClickHint}
              >
                Get a hint?
              </Button>
              <Button btnClass="btn btn-start" handleClick={this.handleClickStart}>
                Start
              </Button>
            </div>
            <p className={`hint ${hintVisibility}`}>
              {hintMessage}
            </p>
          </div>
          <div className="col-3">
            <img
              className="flag"
              src={flag}
              alt={`${countryName} flag`}
            />
          </div>
          <div className="col-3">
            <table className="table-score">
              <thead>
                <tr>
                  <th scope="col" rowSpan="2">Timer</th>
                  <th scope="col" rowSpan="2">Nr of Countries</th>
                  <th scope="col" colSpan="2">Answers</th>
                </tr>
                <tr>
                  <th scope="col" className="good">Good</th>
                  <th scope="col" className="bad">Bad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Timer isStartClicked={isStartClicked} getTime={this.getTimer} />
                  </td>
                  <td>{`${counter}/3`}</td>
                  <td className="good">{good}</td>
                  <td className="bad">{bad}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.user.name,
})

export default connect(mapStateToProps, { addUserName, addUserResults })(withRouter(Topbar))
