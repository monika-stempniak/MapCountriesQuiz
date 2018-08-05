import React from 'react'

class Timer extends React.Component {
  state = {
    minutes: 0,
    seconds: 0,
    oneTimer: false,
  }

  tick = () => {
    const timeToChangeMap = 2
    if (this.state.minutes === timeToChangeMap) {
      this.setState({
        minutes: 0,
        seconds: 0,
      })
      clearInterval(this.timer)
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.oneTimer === false && nextProps.isStartClicked === true) {
      this.timer = setInterval(this.tick, 1000)
      this.setState({
        oneTimer: true,
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { seconds, minutes } = this.state
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds

    return <span>{`0${minutes}:${displaySeconds}`}</span>
  }
}

export { Timer }
