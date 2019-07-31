import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorreducer';
import authReducer from './authreducer';
import Auth from './itemReducer';

// combine redcers from here controller for all reducers
// combine all redcers of same type
export default combineReducers({
    items:itemReducer,
    error:errorReducer,
    auth:authReducer,
});
