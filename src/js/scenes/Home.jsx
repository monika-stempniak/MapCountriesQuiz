// @flow
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../components/header";
import Button from "../components/Button";
import { addUserName } from "../actions/userAction";

type State = {
  name: string,
  isDisable: boolean,
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
    isDisable: true,
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    (e.target: HTMLInputElement);
    this.setState({
      [e.target.name]: e.target.value,
      isDisable: false,
    });
  };

  handleSubmit = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { name } = this.state;
    const { addUserName, history } = this.props;

    addUserName(name);

    history.push("/quiz");
  };

  render() {
    const { name, isDisable } = this.state;

    const disabledClass = isDisable ? "btn-disabled" : "";

    return (
      <div className="home">
        <Header>
          <h2 className="home__header">Welcome</h2>
          <h3 className="home__header">Please, enter your name to proceed</h3>
        </Header>
        <section className="home__content">
          <dir className="container">
            <form onSubmit={this.handleSubmit} className="home__form">
              <div className="home__form-container">
                <label htmlFor="name" className="home__form-label">
                  <input
                    type="text"
                    id="name"
                    className="home__form-input"
                    name="name"
                    onChange={this.handleChange}
                    value={name}
                    placeholder="your name"
                  />
                </label>
                <Button
                  htmlType="submit"
                  btnClass={`btn btn-submit ${disabledClass}`}
                  isDisable={isDisable}
                >
                  Submit
                </Button>
              </div>
            </form>
          </dir>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  { addUserName }
)(withRouter(Home));
