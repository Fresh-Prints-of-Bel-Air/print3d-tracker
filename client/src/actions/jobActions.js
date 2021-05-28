import axios from 'axios';
import {
    SET_LOADING,
    ADD_JOB,
    DELETE_JOB,
    UPDATE_JOB,
    GET_JOBS,
    GET_USER_JOBS,
    JOBS_ERROR,
    UPDATE_USER,
    AUTH_ERROR,
    SET_SELECTED_JOB_ID,
    RESET_JOB_STATE,
    ACCEPT_JOB

} from './types';
export const setLoading = () => async (dispatch) => {
    dispatch({
        type: SET_LOADING // case is in buildReducer
    });
}

export const resetJobState = () => async (dispatch) => {

    dispatch({
        type: RESET_JOB_STATE
    });
}

export const getJobsByIdArray = (jobIdArray) => async (dispatch) => { //for getting the User's jobs (requestedJobs or jobQueue)
    setLoading();
    try {
        const res = await axios.get('/api/jobs/multipleJobsById', { params: { jobIdArray } });
        console.log("JobIdArray in getJobsByIdArray action");
        console.log(jobIdArray);
        console.log("getJobByIdArray res");
        console.log(res);
        dispatch({
            type: GET_USER_JOBS,
            payload: res.data,
        });

    }  catch (err) {
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText,
        });
        console.error('getJobsByIdArray error.');
    }
}


export const getJobs = (filter) => async (dispatch) => {
    setLoading();
    try {
        const res = await axios.get('/api/jobs', { params: filter });
        console.log(res);
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
    console.log("deleting id:");
    console.log(id);
    try{
        const res = await axios.delete(`/api/jobs/${id}`);
        console.log("delete response: ");
        console.log(res);
        console.log("dispatching DELETE_JOB?");
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

export const acceptJob = (job) => async (dispatch) => {
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
        });

        dispatch({
            type: ACCEPT_JOB,
            payload: job
        });

    } catch (err) {
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText
        });
        console.error('Job update error.');
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
        // console.log(jobResponse.data._id);
        // console.log('user is: ');
        // console.log(user);
        dispatch({
            type: ADD_JOB,
            payload: jobResponse.data,
        });

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
    catch(err){
        dispatch({
            type: JOBS_ERROR,
            payload: err.response.statusText
        });
        console.error('Job add error.');
    }
    
}

export const setSelectedJobID = (jobID) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_JOB_ID,
        payload: jobID
    })
}

 