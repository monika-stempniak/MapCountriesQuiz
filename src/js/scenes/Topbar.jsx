// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Timer from '../components/Timer'
import Button from '../components/Button'
import { addUserName, addUserAnswers, fetchCountries } from '../actions/userAction'

type State = {
  countries: Array<any>,
  country: {
    code: string,
    name: string,
    flag: string,
    capital: string,
  },
  goodAnswer: number,
  badAnswer: number,
  isStartClicked: boolean,
  isHintLinkVisible: boolean,
  isHintVisible: boolean,
  hintMessage: string,
  isTimeOut: boolean,
}

type Props = {
  answer: string,
  userName: string,
  fetchCountries: () => () => ({
    type: string,
    payload: Array<any>,
  }),
  countries: Array<any>, //eslint-disable-line
  history: Array<string>,
  addUserAnswers: ({ code: string, answer: boolean }) => () => ({
    type: string,
    payload: Array<{ code: string, answer: boolean }>,
  }),
}

class Topbar extends React.Component<Props, State> {
  state = {
    countries: [],
    country: {
      code: '',
      name: '',
      flag: 'http://via.placeholder.com/150x80?text=COUNTRY+FLAG',
      capital: '',
    },
    goodAnswer: 0,
    badAnswer: 0,
    isStartClicked: false,
    isHintLinkVisible: false,
    isHintVisible: false,
    hintMessage: '',
    isTimeOut: false,
  }

  componentWillMount() {
    this.props.fetchCountries()
  }

  getTimer = (timeOut: boolean) => {
    this.setState({
      isTimeOut: timeOut,
    })
  }

  handleStopAndResetQuiz = () => {
    this.props.history.push('/results')
    this.setState({
      countries: [],
      country: {
        code: '',
        name: '',
        flag: 'http://via.placeholder.com/150x80?text=COUNTRY+FLAG',
        capital: '',
      },
      goodAnswer: 0,
      badAnswer: 0,
      isStartClicked: false,
      isHintLinkVisible: false,
      isHintVisible: false,
      hintMessage: '',
      isTimeOut: false,
    })
  }

  hintTimer = () => setTimeout(() => {
    this.setState({
      isHintVisible: false,
    })
  }, 1000)

  handleClickHint = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({
      isHintVisible: true,
    })
    this.hintTimer()
  }

  handleClickStart = () => {
    const { countries } = this.state
    const { name, capital } = this.state.country
    this.setState({
      isStartClicked: true,
      country: {
        code: countries[0].alpha2Code,
        name: countries[0].name,
        flag: countries[0].flag,
        capital: countries[0].capital,
      },
      isHintLinkVisible: true,
    }, () => {
      this.setState({
        hintMessage: capital ? `Capital: ${capital}` : `Country: ${name}`,
      })
    })
  }

  handleDeleteCountry = () => {
    let countries = [...this.state.countries]; //eslint-disable-line
    countries.shift()
    this.setState({ countries })
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { isStartClicked, goodAnswer, badAnswer, countries, isTimeOut } = this.state
    const { code } = this.state.country
    const { answer } = this.props
    if(nextProps.countries) {
      this.setState({
        countries: [...nextProps.countries],
      })
    }
    if (nextProps.answer && isStartClicked) {
      this.handleDeleteCountry()
      const countriesArrayLength = countries.length - 1
      if (isTimeOut === true || countriesArrayLength === 0) {
        this.handleStopAndResetQuiz()
      } else {
        this.handleClickStart()
      }
      if (nextProps.answer === code && answer !== nextProps.answer) {
        this.setState({
          goodAnswer: goodAnswer + 1,
        }, () => this.props.addUserAnswers({ code, answer: true }))
      } else {
        this.setState({
          badAnswer: badAnswer + 1,
        },() => this.props.addUserAnswers({ code, answer: false }))
      }
    }
  }

  render() {
    const {
      countries,
      isHintLinkVisible,
      isHintVisible,
      hintMessage,
      isStartClicked,
      goodAnswer,
      badAnswer,
    } = this.state

    const { flag, name } = this.state.country

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
              alt={`${name}'s flag`}
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
                  <td>{`${countries.length}/3`}</td>
                  <td className="good">{goodAnswer}</td>
                  <td className="bad">{badAnswer}</td>
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
  countries: state.user.countries,
})

export default connect(mapStateToProps, { addUserName, addUserAnswers, fetchCountries })(withRouter(Topbar))
