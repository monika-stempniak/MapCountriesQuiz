// @flow
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../components/header";
import Timer from "../components/timer";
import Button from "../components/Button";
import { addUserName } from "../actions/userDataAction";
import fetchCountries from "../actions/countriesAction";
import { addUserAnswers } from "../actions/userAnswersAction";
import type { Countries } from "../flow/types.d";

type State = {
  countries: Array<Countries>,
  country: {
    code: string,
    name: string,
    flag: string,
    capital: string,
  },
  goodAnswer: number,
  wrongAnswer: number,
  isStartClicked: boolean,
  isHintLinkVisible: boolean,
  isHintVisible: boolean,
  hintMessage: string,
  isTimeOut: boolean,
  isStartDisable: boolean,
};

type Props = {
  answer: string,
  userName: string,
  fetchCountries: (
    region: string
  ) => () => {
    type: string,
    payload: Array<Countries>,
  },
  countries: Array<Countries>, //eslint-disable-line
  history: Array<string>,
  addUserAnswers: ({ code: string, answer: boolean }) => () => {
    type: string,
    payload: Array<{
      code: string,
      answer: boolean,
    }>,
  },
};

class Topbar extends React.Component<Props, State> {
  state = {
    countries: [],
    country: {
      code: "",
      name: "",
      flag: "http://via.placeholder.com/150x80?text=COUNTRY+FLAG",
      capital: "",
    },
    goodAnswer: 0,
    wrongAnswer: 0,
    isStartClicked: false,
    isHintLinkVisible: false,
    isHintVisible: false,
    hintMessage: "",
    isTimeOut: false,
    isStartDisable: true,
  };

  getTimer = (timeOut: boolean) => {
    this.setState({ isTimeOut: timeOut });
    if (this.state.isTimeOut) {
      this.handleStopAndResetQuiz();
    }
  };

  handleStopAndResetQuiz = () => {
    this.props.history.push("/results");
    this.setState({
      countries: [],
      country: {
        code: "",
        name: "",
        flag: "http://via.placeholder.com/150x80?text=COUNTRY+FLAG",
        capital: "",
      },
      goodAnswer: 0,
      wrongAnswer: 0,
      isStartClicked: false,
      isHintLinkVisible: false,
      isHintVisible: false,
      hintMessage: "",
      isTimeOut: false,
      isStartDisable: true,
    });
  };

  hintTimer = () =>
    setTimeout(() => {
      this.setState({ isHintVisible: false });
    }, 1000);

  handleClickHint = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({ isHintVisible: true });
    this.hintTimer();
  };

  handleClickCountry = () => {
    const { alpha2Code, name, flag, capital, region } = this.state.countries[1];
    this.setState({
      country: {
        code: alpha2Code,
        name,
        flag,
        capital,
      },
      hintMessage: capital ? `Capital: ${capital}` : `Region: ${region}`,
    });
  };

  handleDeleteCountry = () => {
    let countries = [...this.state.countries]; //eslint-disable-line
    countries.shift();
    this.setState({ countries });
  };

  handleClickStart = () => {
    const { countries } = this.state;
    const { alpha2Code, name, flag, capital, region } = this.state.countries[0];
    countries.length !== 0 &&
      this.setState({
        isStartClicked: true,
        country: {
          code: alpha2Code,
          name,
          flag,
          capital,
        },
        isHintLinkVisible: true,
        hintMessage: capital ? `Capital: ${capital}` : `Region: ${region}`,
      });
  };

  handleClickRegion = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    console.log("clicked region:", e.currentTarget.textContent);
    this.props.fetchCountries(e.currentTarget.textContent);
    this.setState({ isStartDisable: false });
  };

  handleKeyPress = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    console.log("pressed region:", e.currentTarget.textContent);
  };

  chooseRegion = () => {
    const regions = [
      "All regions",
      "Africa",
      "Americas",
      "Asia",
      "Europe",
      "Oceania",
    ];

    const levels = regions.map(region => {
      return (
        <span
          className="topbar__regions-region"
          key={region}
          onClick={this.handleClickRegion}
          onKeyPress={this.handleKeyPress}
          role="button"
          tabIndex={0}
        >
          {region}
        </span>
      );
    });
    return levels;
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { isStartClicked, goodAnswer, wrongAnswer, countries } = this.state;
    const { answer } = this.props;
    if (nextProps.countries) {
      this.setState({
        countries: [...nextProps.countries],
      });
    }
    if (isStartClicked) {
      this.handleDeleteCountry();
      const countriesArrayLength = countries.length - 1;
      if (countriesArrayLength === 0) {
        this.handleStopAndResetQuiz();
      } else {
        this.handleClickCountry();
      }
      const code: string = countries[0].alpha2Code;
      if (nextProps.answer === code && answer !== nextProps.answer) {
        this.setState({
          goodAnswer: goodAnswer + 1,
        });
        this.props.addUserAnswers({ code, answer: true });
      } else {
        this.setState({
          wrongAnswer: wrongAnswer + 1,
        });
        this.props.addUserAnswers({ code, answer: false });
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
      wrongAnswer,
      isStartDisable,
    } = this.state;

    const { flag, name } = this.state.country;

    const { userName } = this.props;

    const hintLinkVisibility = isHintLinkVisible ? "is-visible" : "";
    const hintVisibility = isHintVisible ? "is-visible" : "";

    return (
      <Header>
        <section className="topbar">
          <div className="topbar__content">
            <div className="topbar__col-3">
              <h3 className="topbar__quiz-question">
                <span className="topbar__user">{userName},</span>
                which country the flag belongs to?
              </h3>
              <Button
                btnClass="topbar__button--start"
                handleClick={this.handleClickStart}
                isDisable={isStartDisable}
              >
                Start
              </Button>
              <div className="topbar__quiz-hint">
                <Button
                  btnClass={`topbar__button--hint ${hintLinkVisibility}`}
                  handleClick={this.handleClickHint}
                >
                  Get a hint?
                </Button>
                <span className={`topbar__hint ${hintVisibility}`}>
                  {hintMessage}
                </span>
              </div>
            </div>
            <div className="topbar__col-3">
              <img className="topbar__flag" src={flag} alt={`${name}'s flag`} />
            </div>
            <div className="topbar__col-3">
              <table className="topbar__table">
                <thead>
                  <tr>
                    <th scope="col" rowSpan="2">
                      Timer
                    </th>
                    <th scope="col" rowSpan="2">
                      Nr of countries
                    </th>
                    <th scope="col" colSpan="2">
                      Answers
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="topbar__table--good">
                      Good
                    </th>
                    <th scope="col" className="topbar__table--wrong">
                      Wrong
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Timer
                        isStartClicked={isStartClicked}
                        getTime={this.getTimer}
                      />
                    </td>
                    <td>{`${countries.length}/3`}</td>
                    <td className="topbar__table--good">{goodAnswer}</td>
                    <td className="topbar__table--wrong">{wrongAnswer}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="topbar__regions">{this.chooseRegion()}</div>
        </section>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.user.name,
  countries: state.countries.fetched.countries,
});

export default connect(
  mapStateToProps,
  {
    addUserName,
    addUserAnswers,
    fetchCountries,
  }
)(withRouter(Topbar));
