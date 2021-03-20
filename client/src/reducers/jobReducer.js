import {
    GET_JOBS,
    JOBS_ERROR,
    SET_LOADING,
    ADD_JOB,
    UPDATE_JOB,
    DELETE_JOB,
    SET_VIEW
  } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    jobs: [],
    view: 'Engineer',
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
        case GET_USER_JOBS: 
        {
            return
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
        case ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
                loading: false,
                error: null,
            }
        case UPDATE_JOB:
            return {
                ...state,
                jobs: state.jobs.map(job => job.id === action.payload.id ? action.payload : job),
                loading: false,
                error: null,
            }
        case DELETE_JOB: 
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload),
                loading: false,
                error: null,
            }
        case SET_VIEW:
            return {
                ...state,
                view: action.payload,
                loading: false,
                error: null,
            }
        default:
            return state;
    }
}