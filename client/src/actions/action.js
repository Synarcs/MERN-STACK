import {get_ITEMS,add_ITEMS,delete_ITEMS,items_LOADING} from './types';
import axios from 'axios';

export const getItems =() => dispatch =>{
    dispatch(itemsLoading());
    axios.get('/api/items/display')
    .then(data=>{return data})
    .then(data=>{
        dispatch({
            type:get_ITEMS,
            payload:data.data
        })
    }).catch(err=>console.log(err));
}

export const addItems = (item) => dispatch=>{
    // object of food recieved
    console.log(item);
    axios.post('/api/items/display',item)
    .then(data=>{
        dispatch({
            type:add_ITEMS,
            payload:data.data
        })
    }).catch(err=>console.log(err));
}

export const deleteItems = (id) => dispatch =>{
    axios.delete(`/api/items/display/${id}`)
    .then(data=>{
        dispatch({
            type:delete_ITEMS,
            payload:id
        })
    })
}


export const itemsLoading = ()=>{
    return{
        type:items_LOADING,
    }
}
