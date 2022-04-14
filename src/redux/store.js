import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import thunk from 'redux-thunk';


import {appReducer} from './reducer';

const middlewares = [thunk];
const initialState = {};

const rootReducer = combineReducers({
        reducer:appReducer,
});



const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

));



export default store;