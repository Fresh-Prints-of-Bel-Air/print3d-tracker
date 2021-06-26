import {
  // REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  SET_USER_LOADING,
  ADMIN_AUTHENTICATED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAdmin: false,
  isAuthenticated: null,
  //passwordCanBeReset: set to true when the user enters a valid password reset code. Used to display the form fields to enter the new password. Backend still checks the password reset code again
  //upon submission. Set back to false once the password has been reset
  passwordCanBeReset: false, 
  loading: true,
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    // case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case ADMIN_AUTHENTICATED:
      return {
        ...state,
        isAdmin: true,
        loading: false,
        error: null,
      }
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      }
    default:
      return state;
  }
};
