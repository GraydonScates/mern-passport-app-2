import { SET_CURRENT_USER, USER_LOADING, PASSWORD_RESET } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {},
    resetSuccess: false,
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case PASSWORD_RESET:
            return {
                ...state,
                resetSuccess: action.payload.success
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};