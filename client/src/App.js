import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Home from './components/Home';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  useEffect(() => {
    M.AutoInit();
    console.log(store.getState());
  });
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Switch> 
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
}

/* auto-generated div

<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/

export default App;
