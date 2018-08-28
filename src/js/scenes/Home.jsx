// @flow
import * as React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import { addUserName } from '../actions/userAction'

type State = {
  name: string,
  isDisable: boolean,
}

type Props = {
  addUserName: (name: string) => () => ({
    type: string,
    payload: string,
  }),
  history: Array<string>,
}

class Home extends React.Component<Props, State> {
  state = {
    name: '',
    isDisable: true,
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    (e.target: HTMLInputElement)
    this.setState({
      [e.target.name]: e.target.value,
      isDisable: false,
    })
  }

  handleSubmit = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { name } = this.state
    const { addUserName, history } = this.props

    addUserName(name)

    history.push('/quiz')
  }

  render() {
    const { name, isDisable } = this.state

    const disabledClass = isDisable
    ? 'btn-disabled'
    : ''

    return (
      <section className="home">
        <Header section="home">
          Welcome to the Map Countries Quiz
        </Header>
        <br />
        <h2>Please enter your name to proceed</h2>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <input
                type="text"
                id="name"
                className="home-input"
                name="name"
                onChange={this.handleChange}
                value={name}
                placeholder="your name"
              />
            </label>
            <br />
            <br />
            <Button
              htmlType="submit"
              btnClass={`btn btn-submit ${disabledClass}`}
              isDisable={isDisable}
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
    )
  }
}

export default connect(null, { addUserName })(withRouter(Home))
