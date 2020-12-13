import axios from 'axios';
import { set } from 'mongoose';
import {
    SET_LOADING,
    ADD_JOB,
    DELETE_JOB,
    UPDATE_JOB,
    GET_JOBS,
    JOBS_ERROR,
} from './types';
export const setLoading = () => {
    dispatch({
        type: SET_LOADING // case is in buildReducer
    });
}

export const getJobs = (filter) => async (dispatch) => {
    setLoading();
    try {
        const res = await axios.get('/api/jobs', filter);
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

    try{
        const res = await axios.put(`/api/jobs/${job.id}`, job);
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

export const addJob = (job) => async (dispatch) => {
    setLoading();

    try{
        const res = await axios.post('/api/jobs', job);
        dispatch({
            type: ADD_JOB,
            payload: job,
        });
    }
    catch(err){
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText
        });
        console.error('Job add error.');
    }
}