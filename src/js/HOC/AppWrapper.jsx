// @flow
import * as React from 'react';

const AppWrapper = (WrappedComponent: React.ComponentType<{}>): React.ComponentType<{}> => {
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
