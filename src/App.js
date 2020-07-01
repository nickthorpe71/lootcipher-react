import React from 'react';
import { Route, Link } from 'react-router-dom'
import ChestScreen from './ChestScreen/ChestScreen'
import NewItemScreen from './NewItemScreen/NewItemScreen'
import StashScreen from './StashScreen/StashScreen'
import LoadingScreen from './LoadingScreen/LoadingScreen'
import AppContext from './AppContext'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedItems: [],
      currentItem: {},
      accountValue: 0,
    }
  }

  getItems = (query, maxEntries) => {
    return fetch(this.buildUrl(query, maxEntries), {
      headers: { 'Origin': 'X-Requested-With' }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return data.results;
      });
  }

  getImage = (listingId) => {
    return fetch(`https://openapi.etsy.com/v2/listings/${listingId}/images?api_key=mrbs8unvfytnn60kudfot6re`, {
      headers: { 'Origin': 'X-Requested-With' }
    })
      .then(res => res.json())
      .then(data => data.results[0].url_fullxfull)
  }

  buildUrl = (keyWordList) => {
    const baseUrl = 'https://openapi.etsy.com/v2/listings/active?';
    const apiKey = 'api_key=mrbs8unvfytnn60kudfot6re'
    const keyWords = `keywords=${keyWordList}`;
    const limit = `limit=${40}`;
    const minPrice = `min_price=${70}`;

    const url =
      `${baseUrl}${apiKey}&${keyWords}&${limit}&${minPrice}`;
    return url;
  }

  setNewItem = (currentItem) => {
    this.setState({ currentItem });
  }

  addToSavedItems = (newItem) => {
    this.setState({
      savedItems: [...this.state.savedItems, newItem],
      accountValue: this.state.accountValue + newItem.score
    });
  }

  render() {
    const value = {
      getItems: this.getItems,
      getImage: this.getImage,
      setNewItem: this.setNewItem,
      addToSavedItems: this.addToSavedItems,
      calculateAccountValue: this.calculateAccountValue,
      accountValue: this.state.accountValue,
      currentItem: this.state.currentItem,
      savedItems: this.state.savedItems
    }
    return (
      <AppContext.Provider value={value}>
        <main className='App'>
          <Route
            exact
            path="/"
            component={ChestScreen} />
          <Route
            exact
            path="/newItem"
            component={NewItemScreen} />
          <Route
            exact
            path="/stash"
            component={StashScreen} />
          <Route
            exact
            path="/loading"
            component={LoadingScreen} />
        </main>
      </AppContext.Provider>
    );
  }

}
