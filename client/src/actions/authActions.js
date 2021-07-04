import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
//import { FloatingActionButton } from 'materialize-css';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  ADMIN_AUTHENTICATED,
  PASSWORD_RESET_CODE_VERIFIED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  GET_REGISTRATION_REQUESTS,
  GET_ADMIN_ERROR,
  GET_ADMIN_NOTIFICATIONS,
  RESET_JOB_STATE,
  RESET_BUILD_STATE,
  REMOVE_REGISTRATION_REQUEST,
  SET_USER_LOADING,
} from './types';

export const setLoading = () => async (dispatch) => {
  dispatch({
      type: SET_USER_LOADING 
  });
}

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }
  setLoading();
  try {
    const res = await axios.get('/api/auth'); // todo: make sure default route paths are set up properly
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const getUser = () => async (dispatch) => { //primarily used to get and update user notifications
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }

  try {
    const userRes = await axios.get('/api/auth');
   
    //compare today's date to each notification, delete those that are both read and are 3 or more days old
    let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'}).split(',')[0]; //ex 12/28/2020, need to change to 2020-12-18
    today = today.split('/');
    today = today[2] + '-' + today[0] + '-' + today[1]; //2020-12-18
    today = new Date(today);

    userRes.data.notifications = userRes.data.notifications.filter((notification) => {
      let notificationDate = new Date(notification.dateCreated);
      let notificationAge = today - notificationDate;
    
      return (!notification.isRead || notificationAge < 259200000)
    });

    //update the user with the filtered notifications
    try {
      const updatedUser = await axios.put(`/api/users/${userRes.data._id}`, userRes.data, config);
      dispatch({
        type: UPDATE_USER,
        payload: updatedUser.data,
      });
    } catch (err) {
      dispatch({type: AUTH_ERROR});
    }
  } catch (err) {
    dispatch({type: AUTH_ERROR});
  }
}

// Update User

export const updateUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_USER_LOADING,
  });
  
  const config = {
    headers: {
      'Content-Type' : 'application/json',
    }
  }

  try{
    const res = await axios.put(`/api/users/${user._id}`, user, config); 
    dispatch({type: UPDATE_USER, payload: res.data});
  } catch (err) {
    dispatch({type: AUTH_ERROR});
  }

}

export const removeJobFromAcceptingOperators = (jobToRemove) => async (dispatch) => {
  let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'}).split(',')[0]; //ex 12/28/2020, need to change to 2020-12-18
  today = today.split('/');
  today = today[2] + '-' + today[0] + '-' + today[1]; //2020-12-18
  today = new Date(today);
  
  let jobCompleteNotification = {
    text: `Job #${jobToRemove.job_number} from requester ${jobToRemove.requester} is now complete and has been removed from your JobQueue.`,
    dateCreated: today,
    isRead: false,
  }

  let action = {
    filter: { _id: { $in: jobToRemove.acceptingOperators } },
    updateToApply: { 
      $push: { notifications: { $each: [jobCompleteNotification], $position: 0} },
      $pull: { jobQueue: jobToRemove._id }
    }
  }
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    } 
  }
  const res = await axios.put('/api/users/updateMany', action, config);
}
//Request registration
//Posts a registration request object and a notification to the Admin document

export const requestRegistration = (formData) => async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //post registration request object and notification to Admin document
  try {
    const res = await axios.put('/api/admin/register', formData, config);  
    alert("Your registration request has been submitted. Upon approval, your account will be created for you and you'll be able to login using your provided email and password.");
  
  } catch (error) {
    alert(error.response.data);
  }
}

export const pullRegistrationRequest = (regReq) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  try {
    await axios.put('/api/admin/pull', regReq, config);
    dispatch({
      type: REMOVE_REGISTRATION_REQUEST,
      payload: regReq,
    });

  } catch (error) {
    console.error("admin registration pull error");
  }
}

// Register User
// Approves a registration request and creates user
export const register = (regRequest) => async (dispatch) => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post('/api/users', regRequest, config); // api no longer needs to hash the password
   
  } catch (err) {
    
    dispatch({
      type: REGISTER_FAIL,
      payload: err,
    });
  }
};

//Request a password reset.
//Call an /api/auth/forgotPassword POST that checks if a user with the provided email exists, and emails a password reset key to the user if so. 
//Then, a password reset document is created for that user. Values within the password reset document will be used to authenticate the user against the emailed key.

export const requestPasswordReset = (email) => async (dispatch) => { 
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }
    
  try {
    
    const res = await axios.post('/api/auth/forgotPassword', { email }, config);

    dispatch({
      type: PASSWORD_RESET_REQUESTED,
    });
  
  } catch (err) {
    console.log(err);
  }
};

//Call an /api/auth/passwordReset POST that checks the provided password reset key against a hashed version stored in the database. Store the provided key in redux so the user doesn't have to enter it again.
//Allows the user to enter in a new password
export const verifyResetPasswordCode = (resetPasswordCode) => async (dispatch) => {
  
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }
  
  try {
    const res = await axios.post('/api/auth/checkPasswordResetCode', {resetPasswordCode}, config);
    
    dispatch({
      type: PASSWORD_RESET_CODE_VERIFIED,
      payload: resetPasswordCode,
    });
  
  } catch (err) {
   
    alert(err.response.data.msg);
  }
}


//Reset a password.
//Call an /api/auth/passwordChange POST that checks for a second time the provided password reset key stored in redux against the hashed one stored in the database. If they match, delete the associated PasswordReset document
//and change the password of the associated user. Then, delete the password reset key from redux.

export const changePassword = (newPassword, resetPasswordCode) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/auth/passwordChange', { newPassword, resetPasswordCode }, config);
    alert("Your password has been successfully changed. You may now login using your new password.");
    
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });

  } catch (err) {
    alert("Password reset attempt failed. Please try again.");
  }
}

// Login user
export const login = (formData) => async (dispatch) => {
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

    loadUser();
    
  } catch (err) {
    alert(err.response.data.msg);
    
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
}


// Clear Errors
export const clearErrors = () => async (dispatch) =>
  dispatch({
    type: CLEAR_ERRORS,
  });


  //Get admin information
export const getAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admin');

    dispatch({
      type: ADMIN_AUTHENTICATED
    })
    dispatch({ 
      type: GET_REGISTRATION_REQUESTS,
      payload: res.data[0].registrationRequests, // might not be an array
    });
    // dispatch({
    //   type: GET_ADMIN_NOTIFICATIONS,
    //   payload: res.data[0].notifications, // might not be an array
    // });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_ERROR
    })
  }
}