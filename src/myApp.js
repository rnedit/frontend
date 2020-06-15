import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Error from './components/Error';
import TopAppBar from './components/TopAppBarAndLeftMenu';
import Login from './components/Login';

import {UserContext} from './context/UserContext'
import {UserProvider} from './context/UserContext'

export const proxy = "http://localhost:8080"

class App extends Component {
    static contextType = UserContext;
    state = {
        isLoading: true,
        user: this.context,
    };
     async componentDidMount() {
     //   const cookies = new Cookies();
      //  const jwtIDCookie = cookies.get("jwtID");

      //  if (jwtIDCookie!==null) {
      //      await this.JWTSignIn(jwtIDCookie)
      //  }

            //console.log("MyApp "+user) // { name: 'Tania', loggedIn: true }
       // const response = await fetch(proxy+'/users/');
       // const body = await response.json();
        this.setState({isLoading: false });

    }

    render() {
        const {user, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        {/*
        const cookies = new Cookies();
        const jwtIDCookie = cookies.get("jwtID");
        if ( jwtIDCookie==undefined && jwtIDCookie==null) {
            return (
                <BrowserRouter>
                    <Route exact path="/login" component={Login}/>
                    <Redirect to="/login" state={{ status: 302 }} />

                </BrowserRouter>
                )
        } else
          */}
        return (
            <UserProvider value={this.state.user}>
                <BrowserRouter>
                    <div>

                        {/*

                    <Navigation />
                    */}
                        <Switch>
                            {/*
                        <Route path="/" component={Home} exact/>
                        <Route path="/about" component={About}/>
                        <Route path="/contact" component={Contact}/>
                        */}
                            <Route path="/login" component={Login}/>
                            <Route
                                path='/'
                                component={TopAppBar}/>
                            {/*
                            render={(props) => <TopAppBar {...props} user={this.state.user}/>}

                            />
*/}
                            <Route component={Error}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </UserProvider>
        );
    }
}

export default App;