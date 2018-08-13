// @flow
import React from 'react'

type State = {
  minutes: number,
  seconds: number,
  oneTimer: boolean,
  intervalId: IntervalID,
}

type Props = {
  getTime: (timeOut: boolean) => void,
  isStartClicked: boolean,
}

class Timer extends React.Component<Props, State> {
  state = {
    minutes: 0,
    seconds: 0,
    oneTimer: false,
    intervalId: setInterval(() => {})
  }

  tick = () => {
    const timeToChangeMap = 2
    if (this.state.minutes === timeToChangeMap) {
      this.setState({
        minutes: 0,
        seconds: 0,
      })
      clearInterval(this.state.intervalId)
      this.props.getTime(true)
    }
    else {
      this.setState({
        seconds: this.state.seconds + 1,
      })
      if (this.state.seconds > 59) {
        this.setState({
          minutes: this.state.minutes + 1,
          seconds: 0,
        })
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.state.oneTimer === false && nextProps.isStartClicked === true) {
      this.setState({
        intervalId: setInterval(this.tick, 1000),
        oneTimer: true,
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  render () {
    const { seconds, minutes } = this.state
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds

    return <span>{`0${minutes}:${displaySeconds}`}</span>
  }
}

export { Timer }
