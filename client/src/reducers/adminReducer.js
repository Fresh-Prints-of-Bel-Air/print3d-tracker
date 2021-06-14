import {
    GET_ADMIN_NOTIFICATIONS,
    GET_REGISTRATION_REQUESTS,
    GET_ADMIN_ERROR
} from '../actions/types';

const initialState = {
    registrationRequests: [],
    adminNotifications: [],
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_REGISTRATION_REQUESTS:
           return {
               ...state,
                registrationRequests: action.payload,
                loading: false,
                error: false
           }
        case GET_ADMIN_NOTIFICATIONS:
            return {
                ...state,
                adminNotifications: action.payload,
                loading: false,
                error: false,
            } 
        case GET_ADMIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
};