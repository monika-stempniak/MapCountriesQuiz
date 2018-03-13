import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app.jsx'

require('../scss/style.scss');

ReactDOM.render(
    <App />,
    document.getElementById('app')
);