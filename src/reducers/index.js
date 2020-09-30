import { combineReducers } from 'redux';
import  { routerReducer } from "react-router-redux";
import currentUser from './currentUser';
import accessProfile from './accessProfile';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import users from './users';
import profiles from './profiles';
import internal from './internal';
import createInternal from './createInternal';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { reducer as formReducer } from 'redux-form'

//https://www.npmjs.com/package/redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['currentUser'],
    stateReconciler: autoMergeLevel2
}
const accessProfileConfig = {
  key: 'accessProfile',
  storage,
  stateReconciler: autoMergeLevel2
}
const internalConfig = {
  key: 'internal',
  storage,
  stateReconciler: autoMergeLevel2
}
const createInternalConfig = {
  key: 'createInternal',
  storage,
  stateReconciler: autoMergeLevel2
}
const usersPersistConfig = {
    key: 'users',
    storage,
    stateReconciler: autoMergeLevel2
  }
  const profilesPersistConfig = {
    key: 'profiles',
    storage,
    stateReconciler: autoMergeLevel2
  }
const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer,
    accessProfile: persistReducer(accessProfileConfig, accessProfile),
    currentUser: currentUser,
    users: persistReducer(usersPersistConfig, users),
    profiles: persistReducer(profilesPersistConfig, profiles),
    internal: persistReducer(internalConfig, internal),
    createInternal: persistReducer(createInternalConfig, createInternal),
   
})

export default persistReducer(persistConfig,rootReducer);