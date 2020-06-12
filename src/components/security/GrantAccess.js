import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {ROLES} from './ERules';

function GrantAccess (props) {
   
    const userRoles = props.user.roles;
    const history = useHistory();
        return (
            <>
            {
               !userRoles.includes(ROLES.ANONYMOUS)?props.children:history.push("/signin")  
            }
            </>
        )

}
const mapStateToProps = function (state) {
    return {
        user: state.currentUser.user,
    }
}
export default connect(mapStateToProps)(GrantAccess)