import {
    GET_JOBS,
    GET_USER_JOB_QUEUE,
    GET_USER_REQUESTED_JOBS,
    JOBS_ERROR,
    SET_LOADING,
    ADD_JOB,
    ACCEPT_JOB,
    UPDATE_JOB,
    UPDATE_JOBS,
    DELETE_JOB,
    RESET_JOB_STATE,   
    SET_SELECTED_JOB_ID,
    REMOVE_DELETED_BUILD_FROM_JOBS,
  } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    userJobQueue: [], //these refer to actual job objects, not IDs
    userRequestedJobs: [],
    jobs: [],
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
        case GET_USER_JOB_QUEUE: 
            return {
                ...state,
                userJobQueue: action.payload,
                loading: false,
                error: null
            }   
        case GET_USER_REQUESTED_JOBS:
            return {
                ...state,
                userRequestedJobs: action.payload,
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
                userRequestedJobs: [...state.userRequestedJobs, action.payload],
                loading: false,
                error: null,
            }
        case ACCEPT_JOB:
            return {
                ...state,
                userJobQueue: [...state.userJobQueue, action.payload], 
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
        case REMOVE_DELETED_BUILD_FROM_JOBS:
            return {
                ...state,
                jobs: state.jobs ? state.jobs.map(job => ({
                    ...job,
                    builds: job.builds.filter((buildID) => buildID !== action.payload)
                })) : [],
                userJobQueue: state.userJobQueue ? state.userJobQueue.map(job => ({
                    ...job,
                    builds: job.builds.filter((buildID) => buildID !== action.payload)
                })) : [],
                userRequestedJobs: state.userRequestedJobs ? state.userRequestedJobs.map(job => ({
                    ...job,
                    builds: job.builds.filter((buildID) => buildID !== action.payload)
                })) : [],
            }
        case RESET_JOB_STATE:
            return {
                ...state,
                userJobQueue: [], //these refer to actual job objects, not IDs
                userRequestedJobs: [],
                jobs: [],
                loading: false,
                error: null
            }
        default:
            return state;
    }
}