import React from 'react';

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
    }
}
  handleClickBtn() {
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url).then( response => response.json() ).then( countries => {
      console.log(countries);
      const randomCountryNumber = Math.floor(Math.random() * countries.length);
      this.setState({
        countryName: countries[randomCountryNumber].name,
        countryCode: countries[randomCountryNumber].alpha2Code,
        flag: countries[randomCountryNumber].flag,
        capital: countries[randomCountryNumber].capital,
      })
      console.log(this.state.countryName);
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    if (nextProps.answer == this.state.countryCode) {
      this.setState({
        good: this.state.good + 1
      })
      this.handleClickBtn();
    } else {
      this.setState({
        bad: this.state.bad + 1
      })
      this.handleClickBtn();
    }
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
              <a className="quiz-hint" href="">Get a hint?</a>
              <button className="quiz-btn" type="button" onClick={() => this.handleClickBtn()}>Start</button>
            </div>
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
                  <td>00:00</td>
                  <td>1/256</td>
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