import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TopAppBarAndLeftMenu from "./components/TopAppBarAndLeftMenu";
import SignIn from "./components/SignIn";
import { updateCurrentUser, updateValueUser } from './reduxactions/actions';
import { store } from "./init";
import SignUp from './components/SignUp';
import MainDocument from "./workflowForm/MainDocument"
import { ROLES } from './components/security/ERules'
import GrantAccess from './components/security/GrantAccess'
import Main from './components/Main'
import axios from "axios";
import {proxy} from "./components/Conf"
import { useHistory } from "react-router-dom";

export const defaultUser = {
    id: null,
    username: 'Гость',
    parentId: "0",
    firstName: null,
    lastName: null,
    name: null,
    loggedIn: false,
    refreshJwt: null,
    updateCount: 0,
    refreshJwtMaxAge: null,
    roles: [ROLES.ANONYMOUS],
};
//

export const editCurrentUser = (data) => store.dispatch(
    updateCurrentUser(data)
);

const updateValueUserS = (data) => store.dispatch(
    updateValueUser(data)
)

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
    /*
    async checkUser () {
        let promise = new Promise((resolve, reject) => {
                axios.get(proxy + '/api/test/user', 
                    { withCredentials: true })
                    .then(res => {
                        resolve(true)
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response)
                        resolve(false) 
                             
                    })
        })

        const result = await promise;
        console.log(result,"result")
        return result;
    }
*/
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