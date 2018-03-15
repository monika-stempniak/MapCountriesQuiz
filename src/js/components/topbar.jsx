import React from 'react';
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
      hintVisible: {display: 'none'},
      hintMessage: "",
    }
  }

  handleClickBtn = () => {
    if(this.state.isStartClicked != true) {
      this.fetchData()
    }

  }


  fetchData = () => {
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url).then( response => response.json() ).then( countries => {
      // console.log(countries);
      const excludedCountries = ["AQ", "UM"];
      let randomNumber = Math.floor(Math.random() * 20);
      if (excludedCountries.indexOf(countries[randomNumber].alpha2Code) !== -1) {
        randomNumber = Math.floor(Math.random() * 20);
      }

      this.setState({
        countryName: countries[randomNumber].name,
        countryCode: countries[randomNumber].alpha2Code,
        flag: countries[randomNumber].flag,
        capital: countries[randomNumber].capital,
        counter: this.state.counter + 1,
        isStartClicked: true,
        hintVisible: {display: 'block'},
        hintMessage: `Capital: ${this.state.capital}`
      })

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

  handleClickHint() {

  }

  render() {
    return (
      <section className="topbar">
        <header className="topbar-header">
          <h1 className="header-title">Map Countries Quiz</h1>
        </header>
        <div className="topbar-content">
          <div className="col-3">
            <div className="quiz-question">Which country the flag belongs to?</div>
            <div>
              <a className="quiz-hint" href="" style={this.state.hintVisible} onClick={() => this.handleClickHint()}>Get a hint?</a>
              <button className="quiz-btn" type="button" onClick={() => this.handleClickBtn()}>Start</button>
            </div>s
            <div className="hint">hint</div>
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
                  <Timer isStartClicked={this.state.isStartClicked}/>
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

export { Topbar };