import React from 'react';
import { connect } from 'react-redux';

function ProfileContainer(props) {
    return (
        (props.loggedIn===false)
            ? <div>{props.username}</div>
            : <div>Please login to view profile.</div>
    )
}

const mapStateToProps = function(state) {
    console.log(state.currentUser)
    return {
        username: state.currentUser.user.username,
        loggedIn: state.currentUser.user.loggedIn
    }
}

export default connect(mapStateToProps)(ProfileContainer);