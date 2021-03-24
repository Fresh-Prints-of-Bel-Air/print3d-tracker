import axios from 'axios';
import { set } from 'mongoose';
import {
    SET_LOADING,
    ADD_JOB,
    DELETE_JOB,
    UPDATE_JOB,
    GET_JOBS,
    GET_USER_JOBS,
    JOBS_ERROR,
    UPDATE_USER,
    AUTH_ERROR

} from './types';
export const setLoading = () => async (dispatch) => {
    dispatch({
        type: SET_LOADING // case is in buildReducer
    });
}

export const getUserRequestedJobs = (jobIdArray) => async (dispatch) => {
    setLoading();
    try {
        
        const res = await axios.get('/api/jobs/userRequests', { params: { jobIdArray } });
        console.log(res);
        dispatch({
            type: GET_USER_JOBS,
            payload: res.data,
        })
    }  catch (err) {
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText,
        });
        console.error('getUserRequestedJobs error.');
    }
}


export const getJobs = (filter) => async (dispatch) => {
    setLoading();
    try {
        const res = await axios.get('/api/jobs', { params: filter });
        dispatch({
            type: GET_JOBS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText
        });
        console.error('Job get error.');
    }
}

export const deleteJob = (id) => async (dispatch) => {
    setLoading();
    
    try{
        const res = await axios.delete(`/api/jobs/${id}`);
        dispatch({
            type: DELETE_JOB,
            payload: id
        })
    } catch (err) {
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText
        });
        console.error('Job delete error');
    }
}

export const updateJob = (job) => async (dispatch) => {
    setLoading();
    const config = {
        headers: {
          'Content-Type' : 'application/json',
        }
    }
    try{
        const res = await axios.put(`/api/jobs/${job.id}`, job, config);
        dispatch({
            type: UPDATE_JOB,
            payload: job
        })
    } catch (err) {
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText
        });
        console.error('Job update error.');
    }
}

export const addJob = (job, user) => async (dispatch) => { //can also update the user with their most recently requested job
    setLoading();
    const config = {
        headers: {
          'Content-Type' : 'application/json',
        }
    }
    let jobResponse;
    try{
        jobResponse = await axios.post('/api/jobs', job, config);
        console.log(jobResponse.data._id);
        console.log('user is: ');
        console.log(user);
        dispatch({
            type: ADD_JOB,
            payload: jobResponse.data,
        });
        if(user){
            console.log('user is true');
            try{
                const res = await axios.put(`/api/users/${user._id}`, {...user, requestedJobs: [...user.requestedJobs, jobResponse.data._id]}, config);
                dispatch({
                    type: UPDATE_USER,
                    payload: res.data
                });
                console.log(res.data);
            } catch (err){
                dispatch({
                    type: AUTH_ERROR,
                    payload: err.response.statusText
                });
            }
        }
    }
    catch(err){
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText
        });
        console.error('Job add error.');
    }
    
}

 