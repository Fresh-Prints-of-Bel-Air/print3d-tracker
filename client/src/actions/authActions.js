import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
//import { FloatingActionButton } from 'materialize-css';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  GET_REGISTRATION_REQUESTS,
  GET_REGISTRATION_REQUESTS_ERROR
} from './types';

// Load user
export const loadUser = () => async (dispatch) => {
  console.log('loadUser is being called');
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    console.log('getting logged in user...');
    const res = await axios.get('/api/auth'); // todo: make sure default route paths are set up properly
    console.log(res.data);
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Update User

export const updateUser = (user) => async (dispatch) => {
  console.log('updateUser is being called');
  const config = {
    headers: {
      'Content-Type' : 'application/json',
    }
  }
  try{
    console.log(user);
    const res = await axios.put(`/api/users/${user._id}`, user, config); 
    console.log('updated user is: ');
    console.log(res);
    dispatch({type: UPDATE_USER, payload: res.data});
  } catch (err) {
    dispatch({type: AUTH_ERROR});
  }

}


// Register User
export const register = (formData) => async (dispatch) => {
  console.log('register action is being called');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users', formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Login user
export const login = (formData) => async (dispatch) => {
  console.log('login request');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/auth', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log("token is: ");
    console.log(localStorage.getItem('token'));
    loadUser();
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  console.log(localStorage.getItem("token"));
}

// Clear Errors
export const clearErrors = () => async (dispatch) =>
  dispatch({
    type: CLEAR_ERRORS,
  });

export const getRegistrationRequests = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admin');
    dispatch({ 
      type: GET_REGISTRATION_REQUESTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_REGISTRATION_REQUESTS_ERROR
    })
  }
}