import {
    GET_REGISTRATION_REQUESTS,
    GET_REGISTRATION_REQUESTS_ERROR
} from '../actions/types';

const initialState = {
    registrationRequests: [],
    loading: true,
    error: null
}

export default (state = initialState, action) = () => {
    switch(action.type) {
        case GET_REGISTRATION_REQUESTS:
           return {
               ...state,
                registrationRequests: action.payload,
                loading: false,
                error: false
           } 
        case GET_REGISTRATION_REQUESTS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
};