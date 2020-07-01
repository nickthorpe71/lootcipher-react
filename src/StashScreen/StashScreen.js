import React from 'react';
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'
import StashList from '../StashList/StashList'
import AccountValue from '../AccountValue/AccountValue'

export default class StashScreen extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div>
        <StashList />
        <AccountValue />

        <Link to={'/'}>
          <button>Home</button>
        </Link>
      </div>
    )
  }
}