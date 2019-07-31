import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Navbar_menu';
import ShoppingList from './Components/ShoppingList';
import Modals from './Components/Modals';

import {Provider} from 'react-redux';
import store from './store';

import {loaduser} from './actions/authaction';

export default class App extends Component {
  componentDidMount(){
    store.dispatch(loaduser());
  }
  render() {
    return (
      <Provider store={store}>
          <div>
            <Nav />
            <ShoppingList />
          </div>
      </Provider>
    )
  }
}
