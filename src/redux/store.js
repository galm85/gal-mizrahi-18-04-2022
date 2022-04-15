import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import thunk from 'redux-thunk';


import {settingReducer} from './reducers/settingReducer';
import {weatherReducer} from './reducers/weatherReducer';

const middlewares = [thunk];
const initialState = {};

const rootReducer = combineReducers({
        settingReducer,
        weatherReducer
});



const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

));



export default store;