import React from 'react';
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import { connect } from "react-redux";

function LoginLogout(props) {
    if (!props.loggedIn)
        return <LogInButton />
    else
        return <LogOutButton />
}
const mapStateToProps = function (state) {
    return {
        username: state.currentUser.user.username,
        loggedIn: state.currentUser.user.loggedIn
    }
}
export default connect(mapStateToProps)(LoginLogout);;