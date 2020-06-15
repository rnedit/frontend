import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TopAppBarAndLeftMenu from "./components/TopAppBarAndLeftMenu";
import SignIn from "./components/SignIn";
import { updateCurrentUser, updateValueUser } from './reduxactions/actions';
import { store } from "./init";
import SignUp from './components/SignUp';
import MainDocument from "./workflowForm/MainDocument"
import axios from "axios";
import { ROLES } from './components/security/ERules'
import {proxy} from './components/Conf'

import GrantAccess from './components/security/GrantAccess'
import Main from './components/Main'

export const defaultUser = {
    id: null,
    username: 'Гость',
    parentId:"0",
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
                (store.getState().currentUser.user.refreshJwt !== undefined) ? store.getState().currentUser.user.refreshJwt : null
        };
        //
    };

    /*
        shouldComponentUpdate(nextProps, nextState) {
         
        }
    */

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

    async updateJwtToken() {

        if (this.state.id !== null) {
            if (this.state.refreshJwtMaxAge === this.state.updateCount ||
                this.state.refreshJwtMaxAge < this.state.updateCount
                ) {
                console.log("updateToken!")
                const headers = {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
                await axios.post(proxy + '/api/auth/refreshjwt', { "refreshJwt": this.state.refreshJwt },
                    { headers: headers, withCredentials: true })
                    .then(res => {
                        editCurrentUser(res.data)
                        this.setState({ updateCount: 0 })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            this.setState({ updateCount: this.state.updateCount + 1 })
            updateValueUserS({ updateCount: this.state.updateCount })
        }
    }

    componentDidMount() {

        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);

        //Проверка есть ли авторизованный пользователь, если есть то обновит токен
        //console.log(this.state)
        //this.updateCount = setInterval(() => this.updateJwtToken(),
        // this.state.refreshJwtMaxAge!==null?this.state.refreshJwtMaxAge:1800000);
        this.updateCount = setInterval(() => this.updateJwtToken(),
            1000);


        //this.setState({
        //   updateCount: this.state.updateCount += 1   
        //        })
    }
    componentWillUnmount() {
        this.unsubscribeStore();
        clearInterval(this.updateCount);
    }
    render() {

        return (
            <div>

                <Route exact path="/workflow">
                    <GrantAccess>
                        <TopAppBarAndLeftMenu>

                        </TopAppBarAndLeftMenu>
                    </GrantAccess>
                </Route>
                <Route exact path="/workflow/createmaindocument">
                    <GrantAccess>
                        <TopAppBarAndLeftMenu>
                            <MainDocument />
                        </TopAppBarAndLeftMenu>
                    </GrantAccess>
                </Route>

                <Route exact path="/signin">
                    <SignIn />
                </Route>
                <Route exact path="/signup" component={SignUp} />
               
               
                <Route exact path="/" component={Main} />
            </div>


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