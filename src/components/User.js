import React from 'react';
import {connect} from "react-redux";

const User = () => <div>lk</div>;

const mapStateToProps = function(state) {
    //console.log('mapStateToProps',ownProps)
    //console.log('state',state.currentUser.user)
    return {
     //   currentUser: state.currentUser.find(currentUser => currentUser.id === "0"),
    }
}

export default connect(mapStateToProps)(User);