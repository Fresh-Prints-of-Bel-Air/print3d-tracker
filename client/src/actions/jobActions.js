import axios from 'axios';
import {
    SET_LOADING,
    ADD_JOB,
    DELETE_JOB,
    UPDATE_JOB,
    GET_JOBS,
    GET_USER_JOB_QUEUE,
    GET_USER_REQUESTED_JOBS,
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

export const getJobsByIdArray = (jobIdArray, dispatchType) => async (dispatch) => { //for getting the User's jobs (requestedJobs or jobQueue)
    setLoading();
    try {
        const res = await axios.get('/api/jobs/multipleJobsById', { params: { jobIdArray } });
        console.log("JobIdArray in getJobsByIdArray action");
        console.log(jobIdArray);
        console.log("getJobByIdArray res");
        console.log(res);
        if (dispatchType === 'GET_USER_JOB_QUEUE'){
            dispatch({
                type: GET_USER_JOB_QUEUE,
                payload: res.data,
            });
        } else if (dispatchType === 'GET_USER_REQUESTED_JOBS') {
            dispatch({
                type: GET_USER_REQUESTED_JOBS,
                payload: res.data,
            });
        } else {
            console.log("forgot to add second parameter to getJobsByIdArray");
        }
    }  catch (err) {
        console.log(err);
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

// notifications: [{
//     text: String,
//     dateCreated: Date,
//     isRead: {
//       type: Boolean,
//       default: false,
//     }
//   }]

export const deleteJob = (id, userID) => async (dispatch) => { //also send notifications to each acceptingOperator that the job was deleted
    setLoading();
    const config = {
        headers: {
          'Content-Type' : 'application/json',
        }
    }
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
        try {
            let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'}).split(',')[0]; //ex 12/28/2020, need to change to 2020-12-18
            today = today.split('/');
            today = today[2] + '-' + today[0] + '-' + today[1]; //2020-12-18
            today = new Date(today);
            
            let jobDeleteNotification = {
                text: `Job #${res.data.job_number} from requester ${res.data.requester} was deleted.`,
                dateCreated: today,
                isRead: false,
            }
            let action = {
              filter: { _id: { $in: res.data.acceptingOperators } },
              updateToApply: { $push: { notifications: { $each: [jobDeleteNotification], $position: 0} } }
            }
            await axios.put('/api/users/updateMany', action, config); 
            //shouldn't need to update current user, user shouldn't be accepting their own jobs, and notifications should be pulled frequently
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.statusText
            });
        }
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
        await axios.put(`/api/jobs/${job._id}`, job, config);
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

export const updateJob = (job) => async (dispatch) => { //Need to add functionality to move complete jobs to acceptingOperators complete jobs from their jobQueue
    setLoading();
    const config = {
        headers: {
          'Content-Type' : 'application/json',
        }
    }
    try{
        await axios.put(`/api/jobs/${job._id}`, job, config);
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

 