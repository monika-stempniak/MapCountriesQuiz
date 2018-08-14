// @flow
import React from 'react'

type State = {
  minutes: number,
  seconds: number,
  isRunning: boolean,
  intervalId: IntervalID,
}

type Props = {
  getTime: (timeOut: boolean) => void,
  isStartClicked: boolean,
}

class Timer extends React.Component<Props, State> {
  state = {
    minutes: 2,
    seconds: 0,
    isRunning: false,
    intervalId: setInterval(() => {}),
  }

  componentWillUnmount () {
    const { intervalId } = this.state
    clearInterval(intervalId)
  }

  tick = () => {
    const {  minutes, seconds, intervalId } = this.state
    const { getTime } = this.props

    if (minutes === 0 && seconds === 0) {
      this.setState({
        minutes: 0,
        seconds: 0,
        isRunning: false,
      })
      clearInterval(intervalId)
      getTime(true)
    }
    else {
      this.setState({
        seconds: seconds - 1,
      })
      if (seconds <= 0 && minutes !== 0) {
        this.setState({
          minutes: minutes - 1,
          seconds: 59,
        })
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { isRunning } = this.state
    const { isStartClicked } = this.props
    if (isRunning === false && nextProps.isStartClicked === true && isStartClicked !== nextProps.isStartClicked) {
      const interval = 1000
      this.setState({
        intervalId: setInterval(this.tick, interval),
        isRunning: true,
      })
    }
  }

  render () {
    const { seconds, minutes } = this.state
    const digits = 9
    const displaySeconds = seconds <= digits ? `0${seconds}` : seconds

    return (
      <span>
        {`0${minutes}:${displaySeconds}`}
      </span>
    )
  }
}

export default Timer
