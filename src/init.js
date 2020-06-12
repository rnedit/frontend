import thunk from "redux-thunk";
import reducer from './reducers';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistStore} from 'redux-persist';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

//https://www.npmjs.com/package/redux-persist
export const persistor = persistStore(store);
