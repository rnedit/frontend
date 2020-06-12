import { combineReducers } from 'redux';
import  { routerReducer } from "react-router-redux";
import languages from './languages';
import currentUser from './currentUser';
import filterUsers from './filterUsers';
import tracks from './tracks';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

//https://www.npmjs.com/package/redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['currentUser']
}

const rootReducer = combineReducers({
    routing: routerReducer,
    currentUser: currentUser,
    languages: languages,
    filterUsers: filterUsers,
    tracks: tracks,
})

export default persistReducer(persistConfig,rootReducer);