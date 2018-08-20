// @flow
import * as React from 'react';

type Props = {}

const AppWrapper = (WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> => {
  const Wrapper = () => {
    return (
      <div className="app-wrapper">
        <WrappedComponent />
      </div>
    )
  }
  return Wrapper
}
export default AppWrapper
