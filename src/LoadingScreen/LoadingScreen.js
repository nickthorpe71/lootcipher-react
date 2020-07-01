import React from 'react';
import AppContext from '../AppContext'

export default class StashList extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <h2>Loading...</h2>
    )
  }
}