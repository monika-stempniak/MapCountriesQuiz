// @flow
import React from 'react'
import { Header } from '../components/Header.jsx'
import { Timer } from '../components/Timer.jsx'
import { Button } from '../components/Button.jsx'

type State = {
  countryCode: string,
  countryName: string,
  flag: string,
  capital: string,
  good: number,
  bad: number,
  counter: number,
  isStartClicked: boolean,
  hintLinkVisible: {visibility: string},
  hintVisible: {visibility: string},
  hintMessage: string,
  isTimeOut: boolean,
  endDisplay: {display: string},
}

type Props = {
  answer: string,
  // listId: Array<string>,
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
    hintLinkVisible: { visibility: 'hidden' },
    hintVisible: { visibility: 'hidden' },
    hintMessage: '',
    isTimeOut: false,
    endDisplay: { display: 'block' },
  }

  handleClickBtn = () => {
    if(this.state.isTimeOut != true && this.state.counter <= 20) {
      this.fetchData()
    }
  }

  fetchData = () => {
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
          counter: this.state.counter + 1,
          isStartClicked: true,
          hintLinkVisible: { visibility: 'visible' },
        }, () => {
          this.setState({
            hintMessage: `Capital: ${this.state.capital}`,
          })
        })
      })
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.state.isStartClicked) {
      if (nextProps.answer === this.state.countryCode) {
        this.setState({
          good: this.state.good + 1,
        })
      } else {
        this.setState({
          bad: this.state.bad + 1,
        })
      }
      this.handleClickBtn()
    }
  }

  handleClickHint = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({
      hintVisible: { visibility: 'visible' },
    })
    this.hintTimer()
  }

  hintTimer = () => setTimeout(() => {
    this.setState({
      hintVisible: { visibility: 'hidden' },
    })
  }, 1000)

  getTimer = (timeOut: boolean) => {
    this.setState({
      isTimeOut: timeOut,
    })
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
      hintLinkVisible: { visibility: 'hidden' },
      hintVisible: { visibility: 'hidden' },
      hintMessage: '',
      isTimeOut: false,
      endDisplay: { display: 'block' },
    })
  }

  render() {
    const {
      counter,
      isTimeOut,
      endDisplay,
      hintLinkVisible,
      hintVisible,
      hintMessage,
      flag,
      countryName,
      isStartClicked,
      good,
      bad,
    } = this.state

    return (
      <section className="topbar">
        <Header section="topbar">Map Countries Quiz</Header>
        {
          (counter >= 21 || isTimeOut === true) ?

            <div className="the-end" style={endDisplay}>
              <h2 className="the-end-title">The end</h2>
              <Button btnClass="btn btn-play" handleClick={this.handleClickPlayAgain}>Play again</Button>
            </div>

            :

            <div className="topbar-content">
              <div className="col-3">
                <h3 className="quiz-question">Which country the flag belongs to?</h3>
                <div className="quiz-row">
                  <a
                    className="quiz-hint"
                    href=""
                    style={hintLinkVisible}
                    onClick={this.handleClickHint}
                  >
                  Get a hint?
                  </a>
                  <Button btnClass="btn btn-start" handleClick={this.handleClickBtn}>Start</Button>
                </div>
                <p className="hint" style={hintVisible}>{hintMessage}</p>
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
                        <Timer isStartClicked={isStartClicked} getTime={this.getTimer}/>
                      </td>
                      <td>{`${counter}/20`}</td>
                      <td className="good">{good}</td>
                      <td className="bad">{bad}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
        }
      </section>
    )
  }
}

export { Topbar }
