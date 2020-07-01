import React from 'react';
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'

export default class StashList extends React.Component {
  static contextType = AppContext;

  generateList = () => {
    const allItems = this.context.savedItems.map(item => {
      return <li key={item.id}>{item.itemName}   value: {item.score}</li>
    })
    return allItems;
  }

  render() {
    return (
      <ul>
        {this.generateList()}
      </ul>
    )
  }
}

