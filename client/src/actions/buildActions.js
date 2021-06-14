import axios from 'axios';
import { keyDown } from 'materialize-css';
import {
  GET_BUILDS,
  GET_USER_BUILD_LIST,
  ADD_BUILD,
  DELETE_BUILD,
  UPDATE_BUILD,
  BUILDS_ERROR,
  UPDATE_JOBS,
  UPDATE_USER,
  SET_LOADING,
  FAILED_SUBMISSION,
  JOBS_ERROR,
  AUTH_ERROR,
  GET_USER_JOB_QUEUE,
  REMOVE_DELETED_BUILD_FROM_JOBS
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

// get multiple builds according to an array of IDs as input
export const getBuildsByIdArray = (buildIdArray) => async (dispatch) => {
  setLoading();
  try {
    const res = await axios.get('/api/builds/multipleBuildsById', { params: { buildIdArray } });
    console.log("BuildIdArray in getBuildsByIdArray action");
    console.log(buildIdArray);
    console.log("getBuildByIdArray res");
    console.log(res);
    dispatch({
        type: GET_USER_BUILD_LIST,
        payload: res.data,
    });

  } catch (err) {
      dispatch({
          type: BUILDS_ERROR,
          payload: err.response.statusText,
      });
      console.error('getBuildsByIdArray error.');
  }
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
          // including adding the build to the user's build list
      console.log([...user.buildList, buildRes.data._id]);
      const updateUserRes = await axios.put(
        `/api/users/${user._id}`, 
        { ...user, buildList: [...user.buildList, buildRes.data._id] }, 
        config
      );
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

          try { //also update the userJobQueue
            setLoading();
            const userJobRes = await axios.get('/api/jobs/multipleJobsById', { params: { jobIdArray: [...user.jobQueue] } });
            dispatch({
              type: GET_USER_JOB_QUEUE,
              payload: userJobRes.data,
            });
          } catch (err) {
            dispatch({
              type: JOBS_ERROR,
              payload: err.response.statusText,
          });
            console.error('getJobsByIdArray error for userJobQueue.');
          }

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
// 1.) Delete the Build
// 2.) Delete the Build from each associated job
//Filter out the deleted build from jobs, userJobQueue, userRequestedJobs

export const deleteBuild = (id, user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  setLoading();
  
  try {
    console.log("deleteBuild action");
    const deletedBuild = await axios.delete(`/api/builds/${id}`); //delete the build
    console.log("DISPATCHING TO DELETE BUILD");
    console.log(deletedBuild);
    dispatch({type: DELETE_BUILD, payload: id});

    try { //delete the build from each associated job
      let IDs = deletedBuild.data.associatedJobs.map((job) => job.id);
      let action = {
        filter: { _id: { $in: IDs } },
        updateToApply: { $pull: { builds: deletedBuild.data._id } }
      }
      const updatedJobs = await axios.put(`/api/jobs/updateMany`, action, config);
      dispatch({ type: REMOVE_DELETED_BUILD_FROM_JOBS, payload: deletedBuild.data._id });
      

    } catch (err) {
      console.log(err);
      //dispatch({type: JOBS_ERROR, payload: err.response.data.msg});
    }
  } catch (err) {
    console.log(err);
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

