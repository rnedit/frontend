import { combineReducers } from 'redux';

import languages from './languages';
import  { routerReducer } from "react-router-redux";

export default combineReducers({
    routing:routerReducer,
    languages,

});