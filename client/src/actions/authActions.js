import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
//import { FloatingActionButton } from 'materialize-css';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  ADMIN_AUTHENTICATED,
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
  REMOVE_REGISTRATION_REQUEST
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
    console.log("BEFORE GETADMIN");
    //getAdmin();
    console.log("AFTER GETADMIN");
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

  //TODO: CHANGE NAME TO "updateUserNotifications," add behavior to delete read notifications that are 3 or more days old
  try {
    const userRes = await axios.get('/api/auth');
    console.log("USER WITH NOTIFICATIONS:");
    console.log(userRes.data);
    
    //compare today's date to each notification, delete those that are both read and are 3 or more days old
    let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'}).split(',')[0]; //ex 12/28/2020, need to change to 2020-12-18
    today = today.split('/');
    today = today[2] + '-' + today[0] + '-' + today[1]; //2020-12-18
    today = new Date(today);

    console.log("UserRes NOTIFICATIONS");
    console.log(userRes.data.notifications);

    userRes.data.notifications = userRes.data.notifications.filter((notification) => {
      
      let notificationDate = new Date(notification.dateCreated);
      let notificationAge = today - notificationDate;
      console.log("notificationAge");
      console.log(notificationAge);
      console.log(!notification.isRead || notificationAge < 259200000);
      return (!notification.isRead || notificationAge < 259200000)
    });

    console.log("UserRes FILTERED NOTIFICATIONS");
    console.log(userRes.data.notifications);

    //update the user with the filtered notifications
    try {
      const updatedUser = await axios.put(`/api/users/${userRes.data._id}`, userRes.data, config);
      console.log("UPDATED USER WITH FILTERED NOTIFICATIONS:");
      console.log(updateUser.data);
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

export const removeCompletedJobFromAcceptingOperators = (jobToRemove) => async (dispatch) => {
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
    console.log("admin put error");
    console.log(error.response);
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
      payload: err,
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
  console.log('derpa herpa: ');
  console.log(localStorage.getItem("token"));
}


// Clear Errors
export const clearErrors = () => async (dispatch) =>
  dispatch({
    type: CLEAR_ERRORS,
  });


  //Get admin information
export const getAdmin = () => async (dispatch) => {
  try {
    console.log("GETADMIN ACTION");
    const res = await axios.get('/api/admin');
    console.log('getAdmin res.data');
    console.log(res.data);
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