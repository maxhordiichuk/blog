import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ArticleIndex from "./articles/Index";

class App extends Component {
  render() {
    return <ArticleIndex/>;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="React"/>,
    document.body.appendChild(document.createElement('div')),
  )
});
