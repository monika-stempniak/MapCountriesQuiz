import React from 'react';
import { Header } from './header.jsx';
import { Timer } from './timer.jsx';

class Topbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryCode: "",
      countryName: "",
      flag: "http://via.placeholder.com/150x80?text=COUNTRY+FLAG",
      capital: "",
      answer: this.props.answer,
      good: 0,
      bad: 0,
      counter: 0,
      isStartClicked: false,
      hintLinkVisible: {visibility: 'hidden'},
      hintVisible: {visibility: 'hidden'},
      hintMessage: "",
      isTimeOut: false,
      endDisplay: {display: 'block'},
    }
  }

  handleClickBtn = () => {
    if(this.state.isTimeOut != true) {
      this.fetchData();
    }
  }


  fetchData = () => {
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url).then( response => response.json() ).then( countries => {
      // console.log(countries);
      const excludedCountries = ["AQ", "UM"];
      let randomNumber = Math.floor(Math.random() * countries.length);
      if (excludedCountries.indexOf(countries[randomNumber].alpha2Code) !== -1) {
        randomNumber = Math.floor(Math.random() * countries.length);
      }

      this.setState({
        countryName: countries[randomNumber].name,
        countryCode: countries[randomNumber].alpha2Code,
        flag: countries[randomNumber].flag,
        capital: countries[randomNumber].capital,
        counter: this.state.counter + 1,
        isStartClicked: true,
        hintLinkVisible: {visibility: 'visible'},
      }, () => {
        this.setState({
          hintMessage: `Capital: ${this.state.capital}`
        })
      })

      console.log(this.state.countryName);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.isStartClicked) {
        if (nextProps.answer == this.state.countryCode) {
          this.setState({
            good: this.state.good + 1
          })
        } else {
          this.setState({
            bad: this.state.bad + 1
          })
        }
       this.handleClickBtn();
    }
  }

  handleClickHint = (e) => {
    e.preventDefault();
    this.setState({
      hintVisible: {visibility: 'visible'},
    });
    this.hintTimer = setTimeout(() => {
      this.setState({
        hintVisible: {visibility: 'hidden'},
      });
    }, 1000)
  }

  getTimer = (timeOut) => {
    this.setState({
      isTimeOut: timeOut
    })
  }

  handleClickPlayAgain = () => {
    this.setState({
      countryCode: "",
      countryName: "",
      flag: "http://via.placeholder.com/150x80?text=COUNTRY+FLAG",
      capital: "",
      answer: this.props.answer,
      good: 0,
      bad: 0,
      counter: 0,
      isStartClicked: false,
      hintLinkVisible: {visibility: 'hidden'},
      hintVisible: {visibility: 'hidden'},
      hintMessage: "",
      isTimeOut: false,
      endDisplay: {display: 'block'},
    })

  }

  render() {

    if (this.state.counter == 20 || this.state.isTimeOut == true) {
      return (
        <section className="topbar">
          <Header />
          <div className="the-end" style={this.state.endDisplay}>
            <h2 className="the-end-title">The end</h2>
            <button className="btn btn-play" onClick={this.handleClickPlayAgain}>Play again</button>
          </div>
        </section>
      )
    } else {
        return (
          <section className="topbar">
            <Header />
            <div className="topbar-content" style={this.state.contentDisplay}>
              <div className="col-3">
                <div className="quiz-question">Which country the flag belongs to?</div>
                <div className="quiz-row">
                  <a className="quiz-hint" href="" style={this.state.hintLinkVisible} onClick={this.handleClickHint}>Get a hint?</a>
                  <button className="btn btn-start" type="button" onClick={() => this.handleClickBtn()}>Start</button>
                </div>
                <div className="hint" style={this.state.hintVisible}>{this.state.hintMessage}</div>
              </div>
              <div className="col-3">
                <img className="flag" src={this.state.flag} alt={`${this.state.countryName} flag`}/>
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
                      <Timer isStartClicked={this.state.isStartClicked} getTime={this.getTimer}/>
                      <td>{`${this.state.counter}/20`}</td>
                      <td className="good">{this.state.good}</td>
                      <td className="bad">{this.state.bad}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </section>
        )
    }
  }
}

export { Topbar };