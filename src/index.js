import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

//https://www.npmjs.com/package/redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./init";
import LinearIndeterminate from "./components/progress/linear"
import {urlGraphql} from "./api/Conf"
import './i18n';
import {nameStorageJWTField} from './api/Conf'

const link = createHttpLink({
    uri: urlGraphql,
    credentials: 'same-origin',
    
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(nameStorageJWTField);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
    link:authLink.concat(link),
    cache: new InMemoryCache()
  });

ReactDOM.render(

    <React.Fragment>
        <ApolloProvider client={client}>
        <Suspense fallback={(<LinearIndeterminate/>)}>
            <Provider store={store}>
                <BrowserRouter>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </BrowserRouter>
            </Provider>
        </Suspense>
        </ApolloProvider>
        
    </React.Fragment>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
