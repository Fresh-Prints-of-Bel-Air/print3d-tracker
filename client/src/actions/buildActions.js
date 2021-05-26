import axios from 'axios';
import { keyDown } from 'materialize-css';
import {
  GET_BUILDS,
  ADD_BUILD,
  DELETE_BUILD,
  UPDATE_BUILD,
  BUILDS_ERROR,
  UPDATE_JOBS,
  UPDATE_USER,
  SET_LOADING,
  FAILED_SUBMISSION,
  JOBS_ERROR,
  AUTH_ERROR
} from './types';

//Get builds from server that match filter (if any) and save to local state
//"filter" param will be a json object with filters
export const getBuilds = (filter) => async (dispatch) => {

  setLoading();
  console.log("getBuilds called");
  //console.log("filter.status passed into getBuilds:" + filter.status);
  console.log("filter.startedFrom passed into getBuilds:" + filter.startedFrom);
  try {
    console.log(filter);
    
    const res = await axios.get('/api/builds/', { params: filter }); // "params" really means the QUERY PARAMS
    dispatch({
      type: GET_BUILDS, 
      payload: res.data});
    console.log("GET_BUILDS dispatched");
    console.log(res.data);
  }
  catch (err) {
    dispatch({
      type: BUILDS_ERROR, 
      payload: err});
  }

  //////////////// CLIPBOARD WRITE TEST
  // try {
  //   await navigator.clipboard.writeText("Clipboard Test");
  //   console.log("clipboard tested");
  // } catch (error) {
  //   console.log("clipboard test failed");
  // }
  ////////////////
}

//Add a build, and save to local state
//AssociatedJobs is an array of [ job ]. The jobs each have updated quantities, and need to have the new build ID added.
export const addBuild = (build, associatedJobs, user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type' : 'application/json',
      }
    }
    setLoading();
    console.log("addBuild action build argument");
    console.log(build);
    const projectSet = new Set();
    associatedJobs.forEach((job) => projectSet.add(job.projectName));
    const projectArray = Array.from(projectSet);
    const buildRes = await axios.post('/api/builds', {...build, projects: [...projectArray]} , config);
    console.log("buildRes");
    console.log(buildRes);

    dispatch({
      type: ADD_BUILD,
      payload: buildRes.data,
    });

    try { //update the user with the newly created build
      
      const updateUserRes = await axios.put(`/api/users/${user._id}`, user, config);
      console.log("updated user with new build");
      console.log(updateUserRes.data);
      dispatch({type: UPDATE_USER, payload: updateUserRes.data});

      try {
        console.log('associatedJobs');
        console.log(associatedJobs);
        
        //update each associated job to include the ID of the newly added Build
        associatedJobs.forEach(async (job) => {
          let updatedJob = {...job, builds: [...job.builds, buildRes.data._id]};
          const jobUpdateRes = await axios.put(`/api/jobs/${job._id}`, updatedJob, config);
        });
        
  
        //"Get" the updated jobs from the database to update jobs in Redux
        try {
          setLoading();
          let jobIdArray = associatedJobs.map((job) => job._id);
          const jobRes = await axios.get('/api/jobs/multipleJobsById', { params: { jobIdArray: [...jobIdArray] } });
          console.log("associatedJobs in getJobsByIdArray (addBuild)");
          console.log(associatedJobs);
          console.log("getJobByIdArray res (addBuild)");
          console.log(jobRes);
          dispatch({
              type: UPDATE_JOBS,
              payload: jobRes.data,
          });
  
        }  catch (err) {
            dispatch({
                type: JOBS_ERROR,
                payload: err.response.statusText,
            });
            console.error('getJobsByIdArray error.');
        }
  
      } catch (err) {
        console.log("update jobs error");
        console.log(err);
        dispatch({
          type: JOBS_ERROR,
          payload: err.response.data.msg
        });
      }
      
    } catch (err) {
      console.log("Update user error in addBuild");
      console.log(err);
      dispatch({type: AUTH_ERROR});
    }

  } catch (err) {
    console.log("builds error");
    console.log(err);
    dispatch({
      type: BUILDS_ERROR,
      payload: err.response.data.msg
    });
  }
}

export const handleFailedSubmission = (buildSubmission) => async (dispatch) => {
  dispatch({
    type: FAILED_SUBMISSION,
    payload: buildSubmission,
  });
}

//Delete a build
export const deleteBuild = (id) => async (dispatch) => {
  setLoading();
  try {
    await axios.delete(`/api/builds/${id}`);
    dispatch({type: DELETE_BUILD, payload: id});
  } catch (err) {
    dispatch({type: BUILDS_ERROR, payload: err.response.data.msg});
  }
}

//Update a build
export const updateBuild = (build) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type' : 'application/json',
    }
  }
  setLoading();
  try {
    const res = await axios.put(`/api/builds/${build._id}`, build, config);
    
    dispatch({
      type: UPDATE_BUILD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDS_ERROR,
      payload: err.response.data.msg
    });
  }
}

export const setLoading = () => async (dispatch) => {
    dispatch({
      type: SET_LOADING,
    });
};

