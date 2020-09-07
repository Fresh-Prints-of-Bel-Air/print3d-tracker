import { PLACEHOLDER_TYPE } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { FloatingActionButton } from 'materialize-css';

// Load user
export const loadUser = async () => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth'); // todo: make sure default route paths are set up properly
        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
}

// Register User
export const register = async (formData) => {
    const config = {
        headers: {
            'Content-Type:': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users', formData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        loadUser();
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }
}

// Login user
export const login = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/auth', formData, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        loadUser();
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        })
    }
}

// Logout
export const logout = () => dispatch({ type: LOGOUT })

// Clear Errors
export const clearErrors = () => dispatch({
    type: CLEAR_ERRORS 
});