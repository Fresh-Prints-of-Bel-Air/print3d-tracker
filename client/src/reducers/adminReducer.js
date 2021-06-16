import {
    GET_ADMIN_NOTIFICATIONS,
    GET_REGISTRATION_REQUESTS,
    ACCEPT_REGISTRATION_REQUEST,
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
                error: null
           }
        case GET_ADMIN_NOTIFICATIONS:
            return {
                ...state,
                adminNotifications: action.payload,
                loading: false,
                error: null,
            } 
        case ACCEPT_REGISTRATION_REQUEST:
            return {
                ...state,
                registrationRequests: state.registrationRequests.filter((regRequest) => regRequest.email != action.payload.email),
                loading: false,
                error: null
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