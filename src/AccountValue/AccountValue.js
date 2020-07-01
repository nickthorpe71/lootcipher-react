import React from 'react';
import AppContext from '../AppContext'

export default class ChestScreen extends React.Component {

  static contextType = AppContext;

  render() {
    return (
      <p>Account Value: {this.context.accountValue}</p>
    );
  }

}