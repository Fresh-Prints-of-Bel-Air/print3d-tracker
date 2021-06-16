import axios from 'axios';
import e from 'express';
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
  GET_ADMIN_ERROR,
  GET_ADMIN_NOTIFICATIONS,
  RESET_JOB_STATE,
  RESET_BUILD_STATE
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

// Update User

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

//Request registration
//Posts a registration request object and a notification to the Admin document

export const requestRegistration = (formData) => async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try { //post registration request object and notification to Admin document
    console.log("requestRegistration");
    console.log(formData);
    const getRes = await axios.get('/api/admin/');
    let userRequestAlreadyExists = false;
    console.log("requestRegistration GET");
    console.log(getRes);
    getRes.data[0].registrationRequests.forEach((regReq) => {
      if (regReq.email === formData.email){
        userRequestAlreadyExists = true;
      }
    })

    if(!userRequestAlreadyExists){
      try {
        await axios.put('/api/admin/', formData, config);  
      } catch (error) {
        console.log("admin put error");
      }
    } else {
      alert("A user with this email has already requested registration");
    }
    
  } catch (err) {
    console.log("admin get error");
  }
}

export const pullRegistrationRequest = (regReq) => async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  try {
    await axios.put('/api/admin/pull', regReq, config);
  } catch (error) {
    console.log("admin pull put error");
  }
}

// Register User
// Approves a registration request and creates user
export const register = (regRequest) => async (dispatch) => {
  console.log('register action is being called');
  console.log('regRequest');
  console.log(regRequest);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post('/api/users', regRequest, config); // api no longer needs to hash the password
    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data,
    // });
    // loadUser(); // only necessary when the user's registration was automatically approved
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
  dispatch({ type: RESET_JOB_STATE });
  dispatch({ type: RESET_BUILD_STATE });
  
  console.log(localStorage.getItem("token"));
}

// Clear Errors
export const clearErrors = () => async (dispatch) =>
  dispatch({
    type: CLEAR_ERRORS,
  });

export const getAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admin');
    console.log('getAdmin res.data');
    console.log(res.data);
    dispatch({ 
      type: GET_REGISTRATION_REQUESTS,
      payload: res.data[0].registrationRequests, // might not be an array
    });
    dispatch({
      type: GET_ADMIN_NOTIFICATIONS,
      payload: res.data[0].notifications, // might not be an array
    })
  } catch (error) {
    dispatch({
      type: GET_ADMIN_ERROR
    })
  }
}