import {
    //GET_USER_JOBS,
    GET_JOBS,
    GET_USER_JOBS,
    JOBS_ERROR,
    SET_LOADING,
    ADD_JOB,
    ACCEPT_JOB,
    UPDATE_JOB,
    UPDATE_JOBS,
    DELETE_JOB,
    SET_VIEW,
    RESET_JOB_STATE,   
    SET_SELECTED_JOB_ID
  } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    userJobs: [], //these refer to actual job objects, not IDs
    jobs: [],
    view: 'Engineer',
    selectedJobId: 0 // todo delete this
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
            return {
                ...state,
                userJobs: action.payload,
                loading: false,
                error: null
            }   
        case SET_SELECTED_JOB_ID:
            return {
                ...state,
                selectedJobId: action.payload,
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
        case ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
                loading: false,
                error: null,
            }
        case ACCEPT_JOB:
            return {
                ...state,
                userJobs: [...state.userJobs, action.payload], 
                loading: false,
                error: null
            }
        case UPDATE_JOB:
            return {
                ...state,
                jobs: state.jobs.map(job => job._id === action.payload._id ? action.payload : job),
                loading: false,
                error: null,
            }
        case UPDATE_JOBS:
            return {
                ...state,
                jobs: state.jobs.map(job => {
                    let returnJob = job;
                    action.payload.forEach(updatedJob => {
                        if(job._id === updatedJob._id)
                            returnJob = updatedJob;
                    })
                    return returnJob;
                }),
                loading: false,
                error: null
            }
        case DELETE_JOB: 
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload),
                loading: false,
                error: null,
            }
        case RESET_JOB_STATE:
            return {
                ...state,
                jobs: [],
                loading: false,
                error: null
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