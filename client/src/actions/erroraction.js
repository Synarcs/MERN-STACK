import {get_errors,clear_errors} from '../actions/types';

export const geterrors = (msg,status,id)=>{
    const errors = {msg,status,id};
    return{
        type:get_errors,
        payload:errors
    }
}
export const clearerrors = ()=>{
    return{
        type:clear_errors,
    }
}