import React from 'react';

class Timer extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        minutes: 0,
        seconds: 0,
        oneTimer: false,
      }
    }
    componentWillUnmount () {
      clearInterval(this.timer)
    }

    tick = () => {
      const timeToChangeMap = 1;
      if(this.state.seconds == 10) {
        this.setState({
          minutes: 0,
          seconds: 0,
        })
        clearInterval(this.timer);
        this.props.getTime(true);
      }
      else {
        this.setState({
          seconds: this.state.seconds + 1
        })
        if (this.state.seconds > 59) {
          this.setState({
            minutes: this.state.minutes + 1,
            seconds: 0
          })
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if( this.state.oneTimer === false && nextProps.isStartClicked === true) {
        this.timer = setInterval(this.tick, 1000)
        this.setState({
          oneTimer: true
        })
      }
    }

    render () {
      return (
        <td>
          <span>{`0${this.state.minutes}`}</span>:
          <span>{this.state.seconds<10 ? `0${this.state.seconds}` : this.state.seconds}</span>
        </td>
      )
    }
  }

export {Timer}