import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BuildHistory from './components/pages/BuildHistory';
import Home from './components/pages/Home';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  useEffect(() => {
    M.AutoInit();

    //console.log(store.getState());
  });
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/build-history' component={BuildHistory} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
