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
};

class Snackbar extends React.Component<Props, State> {
  //tablica
  state = {
    message: "",
    status: "",
    timeoutId: setTimeout(() => {}),
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

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { message, status } = nextProps.snackbar;
    if (status) {
      const time = 3500;
      this.setState({
        message,
        status,
        timeoutId: setTimeout(this.resetSnackbar, time),
      });
    }
  }

  render() {
    return (
      this.state.status && (
        <div className={`snackbar snackbar--${this.state.status}`}>
          {this.state.message}
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  snackbar: state.countries.fetched.snackbar,
});

export default connect(mapStateToProps)(Snackbar);
