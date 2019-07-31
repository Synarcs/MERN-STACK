import {get_ITEMS,add_ITEMS,delete_ITEMS,items_LOADING} from '../actions/types';
import uuid from 'uuid';

const initialState = {items:[],loading:false}

export default function(state = initialState,action){
    switch(action.type){
        case get_ITEMS:
            return{
                ...state,
                items:action.payload,
                loading:false
            }
        case delete_ITEMS:
            return{
                ...state,
                items:state.items.filter(item=> item._id !== action.payload)                    
            };
        case add_ITEMS:
            return{
                ...state,
                items:[...state.items,action.payload]
            }
        case items_LOADING:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}






