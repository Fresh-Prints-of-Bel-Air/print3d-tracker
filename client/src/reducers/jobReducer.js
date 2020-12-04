import {
    GET_JOBS,
    JOBS_ERROR,
    SET_LOADING
  } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    jobs: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false,
                error: null
            }
        case JOBS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}