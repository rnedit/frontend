import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TopAppBarAndLeftMenu from "./components/TopAppBarAndLeftMenu";
import SignIn from "./components/SignIn";

import { store } from "./init";
import SignUp from './components/SignUp';
import GrantAccess from './components/security/GrantAccess'
import Main from './components/Main'

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //  isAuthenticated: false, 
            updateCount: (store.getState().currentUser.user.updateCount !== undefined) ? store.getState().currentUser.user.updateCount : 0,
            id: (store.getState().currentUser.user.id !== undefined) ? store.getState().currentUser.user.id : null,
            username: (store.getState().currentUser.user.username !== undefined) ? store.getState().currentUser.user.username : null,
            loggedIn:
                (store.getState().currentUser.user.loggedIn !== undefined) ? store.getState().currentUser.user.loggedIn : false,
            refreshJwtMaxAge:
                (store.getState().currentUser.user.refreshJwtMaxAge !== undefined) ? store.getState().currentUser.user.refreshJwtMaxAge : null,
            refreshJwt:
                (store.getState().currentUser.user.refreshJwt !== undefined) ? store.getState().currentUser.user.refreshJwt : null,

            redir: false
        };

        //
    };

    state = this.getCurrentStateFromStore()

    getCurrentStateFromStore() {
        return {
            id: store.getState().currentUser.user.id,
            username: store.getState().currentUser.user.username,
            loggedIn: store.getState().currentUser.user.loggedIn,
            refreshJwtMaxAge: store.getState().currentUser.user.refreshJwtMaxAge,
            refreshJwt: store.getState().currentUser.user.refreshJwt,

        }
    }

    updateStateFromStore = () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            this.setState(currentState);
        }

    }
  
   componentDidMount() {

        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    
    }
    componentWillUnmount() {
        this.unsubscribeStore();
    }
    render() {
        
        return (
            <div>
                <Switch>
                    <Route exact path="/workflow" >
                        <GrantAccess >
                            <TopAppBarAndLeftMenu/>
                        </GrantAccess>
                    </Route>

                    <Route exact path="/signin">
                        <SignIn />
                    </Route>
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/" component={Main} />
                </Switch>

            </div>

            /*
                            <Route exact path="/workflow/createmaindocument">
                                <GrantAccess>
                                    <TopAppBarAndLeftMenu>
                                        <MainDocument />
                                    </TopAppBarAndLeftMenu>
                                </GrantAccess>
                            </Route>
                            */
            /*
            <Switch>
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                children={()=>TopAppBarAndLeftMenu}
                <Route exact path="/workflow" component={TopAppBarAndLeftMenu} />
                <Route path="/" component={Main} />
                <Route path="/users/:id" component={User} />
                <Route path="/tracks/:id" component={Track} />
            </Switch>
            */

        );
    }
}

export default App;