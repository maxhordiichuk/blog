import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Router from "./Router";

class App extends Component {
  render() {
    return <Router/>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="React"/>,
    document.body.appendChild(document.createElement('div')),
  )
});
