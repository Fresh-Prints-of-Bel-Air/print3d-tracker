import { combineReducers } from 'redux';
import authReducer from './authReducer';
import buildReducer from './buildReducer';
import jobReducer from './jobReducer';

export default combineReducers({
    user: authReducer,
    build: buildReducer,
    job: jobReducer
});