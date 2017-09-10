import React from 'react';
import { render } from 'react-dom';
/* eslint-disable */
import '../css/materialize.min.css';
import '../css/style.css';
import '../js/materialize.min.js';
/* eslint-enable */

/**
 * {class}
 */
class App extends React.Component {
  /**
   * [render description]
   * @return {jsx} [description]
   */
  render() {
    return (
      <div>
        <p>Hello Books!</p>
      </div>
    );
  }
}

render(<App/>, window.document.getElementById('app'));