import {get_errors,clear_errors} from '../actions/types';
import thunk from 'redux-thunk';

const initialState = {msg:{},status:null,id:null}
const middleware = [thunk];

export default function(state = initialState,action){
    switch(action.type){
        case get_errors:
            return{
                ...state,
                msg:action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            }
        case clear_errors:
             return{
                ...state,
                msg:{},status:null,id:null
             }
        default:
            return{
                ...state
            }
    }
}