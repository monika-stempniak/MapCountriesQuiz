// @flow
import React from 'react'
import Header from '../components/Header'
import Timer from '../components/Timer'
import Button from '../components/Button'

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
}

type Props = {}

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
  }

  getTimer = (timeOut: boolean) => {
    this.setState({
      isTimeOut: timeOut,
    })
  }

  hintTimer = () => setTimeout(() => {
    this.setState({
      isHintVisible: false,
    })
  }, 1000)

  handleClickBtn = () => {
    const { isTimeOut, counter } = this.state
    if (isTimeOut != true && counter <= 20) {
      this.fetchData()
    }
  }

  fetchData = () => {
    const {counter, capital} = this.state
    const url = 'https://restcountries.eu/rest/v2/all'
    fetch(url)
      .then( response => response.json() )
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
        })
      })
  }

  handleClickHint = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({
      isHintVisible: true,
    })
    this.hintTimer()
  }

  handleClickPlayAgain = () => {
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

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { isStartClicked, countryCode, good, bad } = this.state

    if (isStartClicked) {
      if (nextProps.answer === countryCode) {
        this.setState({
          good: good + 1,
        })
      } else {
        this.setState({
          bad: bad + 1,
        })
      }
      this.handleClickBtn()
    }
  }

  render() {
    const {
      counter,
      isTimeOut,
      isHintLinkVisible,
      isHintVisible,
      hintMessage,
      flag,
      countryName,
      isStartClicked,
      good,
      bad,
    } = this.state

    const hintLinkVisibility = isHintLinkVisible ? {visibility: 'visible'} : {visibility: 'hidden'}
    const hintVisibility = isHintVisible ? {visibility: 'visible'} : {visibility: 'hidden'}

    return (
      <section className="topbar">
        <Header section="topbar">
          Map Countries Quiz
        </Header>
        {
          (counter >= 21 || isTimeOut === true) ? (
            <div className="the-end">
              <h2 className="the-end-title">
                The end
              </h2>
              <Button btnClass="btn btn-play" handleClick={this.handleClickPlayAgain}>
                Play again
              </Button>
            </div>
          ) : (
            <div className="topbar-content">
              <div className="col-3">
                <h3 className="quiz-question">
                  Which country the flag belongs to?
                </h3>
                <div className="quiz-row">
                  <Button
                    btnClass="btn-quiz-hint"
                    style={hintLinkVisibility}
                    handleClick={this.handleClickHint}
                  >
                    Get a hint?
                  </Button>
                  <Button btnClass="btn btn-start" handleClick={this.handleClickBtn}>
                    Start
                  </Button>
                </div>
                <p className="hint" style={hintVisibility}>
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
                      <th scope="col" rowSpan="2">
                        Timer
                      </th>
                      <th scope="col" rowSpan="2">
                        Nr of Countries
                      </th>
                      <th scope="col" colSpan="2">
                        Answers
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" className="good">
                        Good
                      </th>
                      <th scope="col" className="bad">
                        Bad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Timer isStartClicked={isStartClicked} getTime={this.getTimer} />
                      </td>
                      <td>
                        {`${counter}/20`}
                      </td>
                      <td className="good">
                        {good}
                      </td>
                      <td className="bad">
                        {bad}
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          )
        }
      </section>
    )
  }
}

export default Topbar
