import React, { Component, createContext} from 'react'
import axios from "axios";
import history from "../components/utils/history";
import { Provider } from 'react-redux';


const defaultUser = {id:null,username:'Гость',name:null,success:false};
const  UserContext = createContext(defaultUser)
export const  UserContextProvider = UserContext.Provider
export const  UserContextConsumer = UserContext.Consumer

class UserProvider extends Component {
    // Context state

    constructor(props) {
        super(props);

        this.state =
            {
                loh: 'loh',
                user: defaultUser,
            }
            const {store} = props;
        this.store = store;
           // this.getUserName = this.getUserName.bind(this)
        this.startTimer = this.startTimer.bind(this)
    }

    checkJWT = (props) => {
        console.log("checkJWT")
        this.proxy = "http://localhost:8080";
        const {user} = props;
        axios.get(this.proxy+'/users/'+user.id,{withCredentials: true})
            .then(res => {
                //console.log(res.data)
                this.setState(prevState=> ({user: res.data}))
            })
            .catch(error => {
                if (error.response.status===401) {
                    history.push("/login");

                } else
                    console.log(error.response)

            })
    }

    stopTimer() {
        clearInterval(this.timer)
        console.log("stopTimer")
    }

    startTimer(props) {
        this.timer = setInterval(() =>
                this.checkJWT(props),
            300000) //5 минут

    }

    componentDidMount() {
        console.log('componentDidMount')
        const Data = JSON.parse(localStorage.getItem("userInfo"));
        if ( Data == null ) {
            this.setState(prevState=> ({user: defaultUser}))
        } else {
            this.setState(prevState=> ((Data!==null)?Data:this.state.user))
            this.startTimer(Data)
        }

    }

    componentWillUnmount() {
        this.stopTimer()
    }

    componentDidUpdate(prevProps, prevState) {

        if ( (this.state.user.id !== prevState.user.id) || this.state.user.id===null) {
            const {id,username,name,success} = this.state.user
            const u = {user:{
                    id:id,
                    username:username,
                    name:name,
                    success:success
                }
            }
            localStorage.setItem("userInfo",JSON.stringify(u))
        }
    }

    setUser = (user) => {
        this.setState(prevState=> ({user: user}));
    }

    logOut = () => {
        this.setState(prevState=> ({user: defaultUser}));
    }

    getUserName=()=> {
       console.log('getUserName')
    }

    render() {
        const { children } = this.props
        return (

            <Provider store={this.store}
                      value={{
                          user: this.state.user,
                          setUser: this.setUser,
                          logOut: this.logOut,
                          getUserName:this.getUserName,
                          startTimer:this.startTimer,
                          stopTimer:this.stopTimer,
                      }}
            >
                {children}
            </Provider>
        );
    }
}

export {UserProvider}

