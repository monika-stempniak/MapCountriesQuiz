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
}

class Timer extends React.Component<Props, State> {
  state = {
    minutes: 0,
    seconds: 0,
    oneTimer: false,
    intervalId: setInterval(() => {})
  }

  componentWillUnmount () {
    const {intervalId} = this.state
    clearInterval(intervalId)
  }

  tick = () => {
    const {seconds, minutes, intervalId} = this.state
    const {getTime} = this.props

    const timeToChangeMap = 2
    if (minutes === timeToChangeMap) {
      this.setState({
        minutes: 0,
        seconds: 0,
      })
      clearInterval(intervalId)
      getTime(true)
    }
    else {
      this.setState({
        seconds: seconds + 1,
      })
      if (seconds > 59) {
        this.setState({
          minutes: minutes + 1,
          seconds: 0,
        })
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const {oneTimer} = this.state
    if (oneTimer === false && nextProps.isStartClicked === true) {
      this.setState({
        intervalId: setInterval(this.tick, 1000),
        oneTimer: true,
      })
    }
  }

  render () {
    const { seconds, minutes } = this.state
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds

    return (
      <span>
        {`0${minutes}:${displaySeconds}`}
      </span>
    )
  }
}

export default Timer
