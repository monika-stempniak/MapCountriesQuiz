// @flow
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "./Button";
import { addUserName } from "../actions/userDataAction";

type State = {
  name: string,
  email: string,
  gender: string,
  region: string,
  isChecked: boolean,
  isDisabled: boolean,
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
    name: "",
    email: "",
    gender: "",
    region: "",
    isChecked: false,
    isDisabled: true,
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    (e.target: HTMLInputElement);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleChange = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }));
  };

  handleSubmit = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { name } = this.state;
    const { addUserName, history } = this.props;

    console.log(this.state);

    addUserName(name);

    history.push("/quiz");
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
    const { name, email, gender, region, isChecked, isDisabled } = this.state;

    const disabledClass = isDisabled ? "btn-disabled" : "";

    return (
      <dir className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form__container">
            <label htmlFor="name" className="form__label">
              <input
                type="text"
                id="name"
                className="form__input"
                name="name"
                onChange={this.handleChange}
                value={name}
                placeholder="User name"
              />
            </label>
            <label htmlFor="email" className="form__label">
              <input
                type="text"
                id="email"
                className="form__input"
                name="email"
                onChange={this.handleChange}
                value={email}
                placeholder="Email"
              />
            </label>
            <fieldset className="form__label">
              <legend>Choose gender</legend>
              <label htmlFor="female" className="form__label-radio">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="form__radio"
                  onChange={this.handleChange}
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
                  value="male"
                  checked={gender === "male"}
                />
                Male
              </label>
            </fieldset>
            <label htmlFor="rodo" className="form__label form__label-checkbox">
              <input
                type="checkbox"
                id="rodo"
                className="form__checkbox"
                onChange={this.toggleChange}
                checked={isChecked}
              />
              I agree with RODO policy
            </label>
            <label htmlFor="regions" className="form__label">
              <select
                id="regions"
                name="region"
                className="form__input"
                value={region}
                onChange={this.handleChange}
              >
                <option value="" disabled hidden>
                  Choose region
                </option>
                {this.selectRegion()}
              </select>
            </label>
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
