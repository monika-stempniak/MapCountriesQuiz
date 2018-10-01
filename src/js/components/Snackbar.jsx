// @flow
import * as React from "react";
import { connect } from "react-redux";
import { showSnackbarMessage } from "../actions/snackbarAction";
import type { SnackbarMessage } from "../flow/types.d";

type Props = {
  snackbar: SnackbarMessage, //eslint-disable-line
};

type State = {
  message: string,
  type: string,
  timeoutId: TimeoutID,
};

class Snackbar extends React.Component<Props, State> {
  //tablica
  state = {
    message: "",
    type: "",
    timeoutId: setTimeout(() => {}),
  };

  componentWillUnmount() {
    const { timeoutId } = this.state;
    clearTimeout(timeoutId);
  }

  resetSnackbar = () => {
    this.setState({
      message: "",
      type: "",
    }),
      clearTimeout(this.state.timeoutId);
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { content, type } = nextProps.snackbar;
    if (type) {
      const time = 3500;
      this.setState({
        message: content,
        type,
        timeoutId: setTimeout(this.resetSnackbar, time),
      });
    }
  }

  render() {
    return (
      this.state.type && (
        <div className={`snackbar snackbar--${this.state.type}`}>
          {this.state.message}
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  snackbar: state.snackbar.message,
});

export default connect(
  mapStateToProps,
  { showSnackbarMessage }
)(Snackbar);
