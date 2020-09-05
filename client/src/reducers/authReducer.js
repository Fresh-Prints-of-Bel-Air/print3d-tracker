import { PLACEHOLDER_TYPE } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PLACEHOLDER_TYPE:
            return {
                ...state
            }
            default: return state;
    }
}