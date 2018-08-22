// @flow
import * as React from 'react';
import { connect } from 'react-redux'
import Header from '../components/Header'
import Button from '../components/Button'
import addName from '../actions/nameAction'

type State = {
  name: string,
}

type Props = {
  addName: (name: string) => () => ({
    type: string,
    payload: string,
  }),
}

class Home extends React.Component<Props, State> {
  state = { name: '' }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    (e.target: HTMLInputElement)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { name } = this.state
    const { addName } = this.props
    addName(name)
  }

  render() {
    const { name } = this.state
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
              btnClass='btn btn-submit'
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
    )
  }
}

export default connect(null, { addName })(Home)
