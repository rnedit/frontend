import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROLES } from './ERules';
import Moment from 'moment';
import { editCurrentUser } from "../../App"
import axios from "axios";
import { proxy } from '../Conf'

function GrantAccess(props) {
    const user = props.user;
    const checkAuth = () => {
        Moment.locale('ru');

        if (!user.updatedJwt) {
            console.log("refreshJwt false", user.updatedJwt)
            return false;

        }

        if (user.roles.includes(ROLES.USER | ROLES.ADMIN | ROLES.MODERATOR)) {
            console.log("roles false", user.roles)
            return false

        }

        try {
            const exp = Moment(user.updatedJwt).diff(Moment().startOf('day'), 'seconds');
            const cur = Moment(new Date().getTime()).diff(Moment().startOf('day'), 'seconds');
            console.log("Current", exp, cur)
            if (exp < cur) {
                console.log("updatedJwt time exp ", exp, cur)

                return updateJwtToken();
            }

        } catch (e) {
            console.log("Error", e)
            return false;
        }
        console.log("GrantAccess true")
        return true;
    }

    async function updateJwtToken () {
        let promise = new Promise((resolve, reject) => {

            if (user.refreshJwt !== null) {
                console.log("updateToken!")
                const headers = {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
                axios.post(proxy + '/api/auth/refreshjwt', { "refreshJwt": user.refreshJwt },
                    { headers: headers, withCredentials: true })
                    .then(res => {
                        editCurrentUser(res.data)
                        resolve(true)
                      
                    })
                    .catch(error => {
                        console.log(error)
                        resolve(false)                       
                    })
            }
            resolve(false)         
        })

        let result = await promise;
        return result;
        
    }

    return (
        <>
            {checkAuth() ? (
                props.children
            ) : (
                    <Redirect to={{ pathname: '/signin' }} />
                )}
        </>
    )

}
const mapStateToProps = function (state) {
    return {
        user: state.currentUser.user,
    }
}
export default connect(mapStateToProps)(GrantAccess)