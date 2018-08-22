// @flow
import * as React from 'react';

type Props = {
  addUserName: (name: string) => () => ({
    type: string,
    payload: string,
  }),
}

const AppWrapper = (WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> => {
  const Wrapper = (props) => {
    return (
      <div className="app-wrapper">
        <WrappedComponent {...props} />
      </div>
    )
  }
  return Wrapper
}
export default AppWrapper
