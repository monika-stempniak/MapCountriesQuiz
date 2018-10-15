// @flow
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "./Button";
import { addUserName } from "../actions/userDataAction";

type State = {
  username: string,
  email: string,
  gender: string,
  region: string,
  isChecked: boolean,
  isDisabled: boolean,
  usernameError: string,
  emailError: string,
  genderError: string,
  regionError: string,
  isCheckedError: string,
};

type Props = {
  addUserName: (
    name: string
  ) => () => {
    type: string,
    payload: string,
  },
  history: Array<string>,
};

class Home extends React.Component<Props, State> {
  state = {
    username: "",
    email: "",
    gender: "",
    region: "",
    isChecked: false,
    isDisabled: true,
    usernameError: "",
    emailError: "",
    genderError: "",
    regionError: "",
    isCheckedError: "",
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    (e.target: HTMLInputElement);
    this.setState({
      [e.target.name]: e.target.value,
      isDisabled: false,
    });
  };

  toggleChange = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
      isDisabled: false,
    }));
  };

  validateForm = () => {
    const { username, email, gender, region, isChecked } = this.state;

    let isError = false;
    const errors = {
      usernameError: "",
      emailError: "",
      genderError: "",
      regionError: "",
      isCheckedError: "",
    };

    if (username.length < 3) {
      isError = true;
      errors.usernameError = "Username needs to be at least 3 characters long";
    }

    if (email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Required valid email";
    }

    if (gender === "") {
      isError = true;
      errors.genderError = "Gender needs to be chosen";
    }

    if (!isChecked) {
      isError = true;
      errors.isCheckedError = "Policy needs to be checked";
    }

    if (region === "") {
      isError = true;
      errors.regionError = "Region needs to be chosen";
    }

    console.log(errors);

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  };

  handleBlur = () => {
    this.validateForm();
  };

  handleSubmit = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { username } = this.state;
    const { addUserName, history } = this.props;

    const err = this.validateForm();

    if (!err) {
      addUserName(username);

      history.push("/quiz");

      this.setState({
        username: "",
        email: "",
        gender: "",
        region: "",
        isChecked: false,
        isDisabled: true,
        usernameError: "",
        emailError: "",
        genderError: "",
        regionError: "",
        isCheckedError: "",
      });
    }

    console.log(this.state);
  };

  selectRegion = () => {
    const regions = [
      "All regions",
      "Africa",
      "Americas",
      "Asia",
      "Europe",
      "Oceania",
    ];

    const allRegions = regions.map(region => (
      <option value={region} key={region}>
        {region}
      </option>
    ));

    return allRegions;
  };

  render() {
    const {
      username,
      email,
      gender,
      region,
      isChecked,
      isDisabled,
      usernameError,
      emailError,
      genderError,
      regionError,
      isCheckedError,
    } = this.state;

    const disabledClass = isDisabled ? "btn-disabled" : "";

    return (
      <dir className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form__container">
            <label htmlFor="username" className="form__label">
              <input
                type="text"
                id="username"
                className="form__input"
                name="username"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={username}
                placeholder="Username"
              />
            </label>
            <p className="form__error">{usernameError}</p>
            <label htmlFor="email" className="form__label">
              <input
                type="text"
                id="email"
                className="form__input"
                name="email"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={email}
                placeholder="Email"
              />
            </label>
            <p className="form__error">{emailError}</p>
            <fieldset className="form__label">
              <legend>Choose gender</legend>
              <label htmlFor="female" className="form__label-radio">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="form__radio"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value="female"
                  checked={gender === "female"}
                />
                Female
              </label>
              <label htmlFor="male" className="form__label-radio">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="form__radio"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value="male"
                  checked={gender === "male"}
                />
                Male
              </label>
            </fieldset>
            <p className="form__error">{genderError}</p>
            <label htmlFor="rodo" className="form__label form__label-checkbox">
              <input
                type="checkbox"
                id="rodo"
                className="form__checkbox"
                onChange={this.toggleChange}
                onBlur={this.handleBlur}
                checked={isChecked}
              />
              I agree with RODO policy
            </label>
            <p className="form__error">{isCheckedError}</p>
            <label htmlFor="regions" className="form__label">
              <select
                id="regions"
                name="region"
                className="form__input"
                value={region}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              >
                <option value="" disabled hidden>
                  Choose region
                </option>
                {this.selectRegion()}
              </select>
            </label>
            <p className="form__error">{regionError}</p>
            <Button
              htmlType="submit"
              btnClass={`btn btn-submit ${disabledClass}`}
              isDisabled={isDisabled}
            >
              Submit
            </Button>
          </div>
        </form>
      </dir>
    );
  }
}

export default connect(
  null,
  { addUserName }
)(withRouter(Home));
