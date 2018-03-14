import React from 'react';
import { Map } from './map.jsx';
import { Topbar } from './topbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Topbar />
        <Map />
      </div>
    )
  }
}

export { App };

