// @flow
import * as React from "react";
import { connect } from "react-redux";

type Props = {
  //eslint-disable-next-line
  snackbar: {
    message: string,
    status: string,
  },
};

type State = {
  message: string,
  status: string,
  timeoutId: TimeoutID,
  shouldClose: boolean,
};

class Snackbar extends React.Component<Props, State> {
  state = {
    message: "",
    status: "",
    timeoutId: setTimeout(() => {}),
    shouldClose: false,
  };

  componentWillUnmount() {
    const { timeoutId } = this.state;
    clearTimeout(timeoutId);
  }

  resetSnackbar = () => {
    this.setState({
      message: "",
      status: "",
    }),
      clearTimeout(this.state.timeoutId);
  };

  handleClick = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    console.log("clicked", e.currentTarget);
    this.setState({
      shouldClose: true,
    });
    this.resetSnackbar;
  };

  handleKeyPress = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    console.log("pressed region:", e.currentTarget);
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { message, status } = nextProps.snackbar;
    if (status) {
      const time = 5500;
      this.setState({
        message,
        status,
        timeoutId: setTimeout(this.resetSnackbar, time),
        shouldClose: false,
      });
    }
  }

  render() {
    const { status, message, shouldClose } = this.state;
    const shouldCloseClass = shouldClose ? "close" : "open";
    return (
      status && (
        <div
          className={`snackbar snackbar--${status} snackbar--${shouldCloseClass}`}
        >
          {message}
          <span
            className="snackbar__close-btn"
            onClick={this.handleClick}
            onKeyPress={this.handleKeyPress}
            role="button"
            tabIndex={0}
          >
            x
          </span>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  snackbar: state.countries.fetched.snackbar,
});

export default connect(mapStateToProps)(Snackbar);
