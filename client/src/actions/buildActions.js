import axios from 'axios';
import {
  GET_BUILDS,
  ADD_BUILD,
  DELETE_BUILD,
  UPDATE_BUILD,
  BUILDS_ERROR,
  SET_LOADING,
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
    console.log("dispatched");
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
export const addBuild = (build) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type' : 'application/json',
      }
    }
    setLoading();
    const res = await axios.post('/api/builds', build, config);

    dispatch({
      type: ADD_BUILD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDS_ERROR,
      payload: err.response.data.msg
    });
  }
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

