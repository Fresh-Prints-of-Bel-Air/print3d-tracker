import {
  ADD_BUILD,
  GET_BUILDS,
  DELETE_BUILD,
  SET_LOADING,
  BUILDS_ERROR,
  UPDATE_BUILD,
  CLEAR_ERRORS,
  FAILED_SUBMISSION
 
} from '../actions/types';

const initialState = {
  loading: true,
  builds: [],
  lastFailedSubmission: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUILDS: //also used for search builds
      return {
        ...state,
        builds: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_BUILD:
      return {
        ...state,
        builds: state.builds.filter((build) => build.id !== action.payload),
        loading: false,
        error: null,
      }
    case UPDATE_BUILD:
      return {
        ...state,
        builds: state.builds.map((build) => build.id === action.payload ? action.payload : build),
        loading: false,
        error: null,
      }
    case FAILED_SUBMISSION:
    return {
      ...state,
      lastFailedSubmission: action.payload,
      loading: false,
      error: null,
    }
    case ADD_BUILD:
      return {
        ...state,
        builds: [...state.builds, action.payload],
        loading: false,
        error: null,
      }
    case BUILDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};
