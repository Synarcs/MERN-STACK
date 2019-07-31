import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {compose} from 'redux';

const initialState = {};
const middleware  = [thunk];

// main state store fro the application
const store = createStore(rootReducer,initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)


export default store;
