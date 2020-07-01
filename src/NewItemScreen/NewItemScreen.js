import React from 'react';
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'
import AccountValue from '../AccountValue/AccountValue'

export default class NewItemScreen extends React.Component {

  static contextType = AppContext;

  handleClickKeep = () => {
    this.context.addToSavedItems(this.context.currentItem);
    this.props.history.push('/stash');
  }

  render() {
    return (
      <div className="container center-main">
        <section className="item top-left-img">
          <Link to={'/'}>
            <button>Toss</button>
          </Link>
        </section>
        <section className="item top-center-img">
          <h2>{this.context.currentItem.itemName}</h2>
          <img src={this.context.currentItem.img} alt={this.context.currentItem.itemName}></img>
        </section>
        <section className="item top-right-img">
          <button onClick={this.handleClickKeep}>Keep</button>
        </section>
        <section className="item bottom-left-img">
          <Link to={'/stash'}>
            <button>Stash</button>
          </Link>
        </section>
        <section className="item bottom-center-img">
          <p>{this.context.currentItem.description}</p>
        </section>
        <section className="item bottom-right-img">
          <AccountValue />
        </section>
      </div>
    );
  }
}