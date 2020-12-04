import axios from 'axios';
import {
    SET_LOADING
} from './types';
export const setLoading = () => {
    dispatch({
        type: SET_LOADING // case is in buildReducer
    });
}

export const getJobs = (filter) => {
    setLoading();
    try {
        const res = await axios.get('/api/jobs', filter);
        dispatch({
            type: GET_JOBS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: JOBS_ERROR
        });
        console.error('getJobs error');
    }
}