import {login_error,login_success,register_error,register_success,user_loaded,user_loading,auth_error,logout_success} from '../actions/types';

const initialState = {token:localStorage.getItem('token'),isauth:null,isLoading:false,isuser:null}
export default function(state = initialState,action){
    switch(action.type){
        // fetch data from backend
        case user_loading:
            return{
                ...state,
                isLoading:true
            }
            // transfered to the frontend in redux store specially fro login a user
        case user_loaded:
            return{
                ...state,
                isauth:true,
                isLoading:false,
                isuser:action.payload
            } 
            // well authenticated user verified jwt token
        case login_success: 
        case register_success:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isauth:true,
                isLoading:false,
                isuser:action.payload
            }
       case auth_error: case login_error: case register_error: case logout_success:
           localStorage.removeItem('token');
            return{
               ...state,
                token:null,
                isuser:null,
                isLoading:false,
                isauth:false,
                users:null,
            }
        default:
            return{
                ...state,
            }
    }
}