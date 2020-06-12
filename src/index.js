import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

//https://www.npmjs.com/package/redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./init";
import LinearIndeterminate from "./components/progress/linear"

import './i18n';

ReactDOM.render(

    <React.Fragment>
        <Suspense fallback={(<LinearIndeterminate/>)}>
            <Provider store={store}>
                <BrowserRouter>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </BrowserRouter>
            </Provider>
        </Suspense>
    </React.Fragment>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
