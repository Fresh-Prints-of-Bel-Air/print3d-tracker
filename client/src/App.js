import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword';
import BuildHistory from './components/pages/BuildHistory';
import RequestHistoryPage from './components/pages/RequestHistoryPage';
import Home from './components/pages/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import ScrollToTop from './components/pages/ScrollToTop';

function App() {

  

  useEffect(() => {
    M.AutoInit();
    
    //console.log(store.getState());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <ScrollToTop/>
          <Navbar />
          <Switch>
            <PrivateRoute exact path='/build-history' component={BuildHistory} />
            <PrivateRoute exact path='/request-history' component={RequestHistoryPage} />
            <PrivateRoute exact path='/' component={Home}/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/forgotPassword' component={ForgotPassword}/>
            <Route exact path ='/resetPassword' component= {ResetPassword}/>
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
