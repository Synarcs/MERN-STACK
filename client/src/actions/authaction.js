import {login_error,login_success,register_error,register_success,user_loaded,user_loading,auth_error,logout_success} from '../actions/types';
import {geterrors} from './erroraction';
import axios from 'axios';

// get it from local storage
function get_token(getState){
    const token = getState().auth.token;
    const config={
        headers:{
            "Content-Type":"application/json",
        }
    }
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config;
}

// check token and loaduser deals with login
export const loaduser = ()=>(dispatch,getState)=>{
    dispatch(userloading());
    // get token
    const config = get_token(getState);
    axios.get('/api/auth/users',config)
    .then(data=>{
        // if authenticated user is loaded and needs to login
        dispatch({
            type:user_loaded,
            payload:data.data
        })
    }).catch(err=>{
        // fires when no token is present and user is not authenticated
        dispatch(geterrors(err.response.data,err.response.status));
        dispatch({
            type:auth_error
        })
    })
}

export const Register=({username,email,password}) => dispatch=>{
    // add content type post request to /api/users  ==> add user request
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body  = JSON.stringify({username,email,password});
    axios.post('/api/users',body,config)
    .then(res=>{
        dispatch({
            type:register_success,
            payload:res.data
        })
    }).catch(err=>{
        if(!username && !email && !password){
            dispatch(geterrors(err.response.data,err.response.status,'register_error'));
            dispatch({  
                type:register_error
            })
        }
    })
}

export const Login = ({email,password})=> dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const login_user = {email,password};
    axios.post('/api/authenticate',login_user,config)
    .then(data=>{
        dispatch({
            type:login_success,
            payload:data.data
        })
    }).catch(err=>{
        dispatch(geterrors(err.response.data,err.response.status,'Login_error'));
        return{
            type: login_error
        }
    })
}

export const logout = ()=>{
    return{
        type:logout_success,
    }
}


export const userloading = ()=>{
    return{
        type:user_loading
    }
}