import { combineReducers } from 'redux';
import  { routerReducer } from "react-router-redux";
import currentUser from './currentUser';
import accessProfile from './accessProfile';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import users from './users';
import profiles from './profiles';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

//https://www.npmjs.com/package/redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['currentUser'],
    stateReconciler: autoMergeLevel2
}
const usersPersistConfig = {
    key: 'users',
    storage,
    whitelist:['users'],
    stateReconciler: autoMergeLevel2
  }
  const profilesPersistConfig = {
    key: 'profiles',
    storage,
    whitelist:['profiles'],
    stateReconciler: autoMergeLevel2
  }
const rootReducer = combineReducers({
    routing: routerReducer,
    accessProfile: accessProfile,
    currentUser: currentUser,
    users: persistReducer(usersPersistConfig, users),
    profiles: persistReducer(profilesPersistConfig, profiles),
})

export default persistReducer(persistConfig,rootReducer);