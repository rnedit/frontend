import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROLES } from './ERules';
import Moment from 'moment';
import { editCurrentUser } from "../../reducers/currentUser"
import { setAccessProfiles } from "../../reducers/accessProfile"
import axios from "axios";
import { proxy } from '../../api/Conf'
import LinearProgress from '@material-ui/core/LinearProgress';

import { securityApi } from '../../api/Security'

function GrantAccess(props) {
    const user = props.user;
    const [g, setG] = React.useState(true)
    const [r, setR] = React.useState(false)

    React.useEffect(() => {
        if (g === false)
            setR(true)
        else
            setR(false)
    }, [g])

    const checkAuth = React.useCallback(
        async () => {
            Moment.locale('ru');

            if (!user.updatedJwt) {
                console.log("refreshJwt false", user.updatedJwt)
                return false;

            }

            const as = await checkUser();
            if (as !== true) {
                console.log("checkUser false")
                setG(false)
                return false;
            } else {
                setG(true)
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
        },
        [],
    )

    React.useEffect(() => {
        checkAuth();
    }, [checkAuth])

    async function checkUser() {
        //     let promise = new Promise((resolve, reject) => {
        //             axios.get(proxy + '/api/test/user', 
        //                 { withCredentials: true })
        //                 .then(res => {
        //                     resolve(true)
        //                 })
        //                 .then(() => {
        //                     getAccessProfile()
        //                      .then(res => {
        //                          if (res.data.accessprofile!==null && res.data.accessprofile!==undefined) {
        //                             props.setAccessProfiles(res.data.accessprofile)
        //                          }
        //                     })
        //                 })
        //                 .catch(error => {
        //                     console.log(error)
        //                     console.log(error.response)
        //                     resolve(false) 
        //                 })
        //     })

        //     const result = await promise;
        // console.log(result,"result")
        //     return result;
        let promise = new Promise((resolve, reject) => {
            securityApi.testUser().then(res => {
                if (res.status!==null && res.status!==undefined){
                    if (res.status===200)
                        resolve(true)
                    else
                        resolve(false)
                } else {
                    resolve(false)
                }
                
            }).then(() => {
                securityApi.getaccessprofile(user.id).then(res => {
                    if (res.status!==null && res.status!==undefined){
                        if (res.status === 200)
                            if (res.data.accessprofile !== null && res.data.accessprofile !== undefined) {
                                props.setAccessProfiles(res.data.accessprofile)
                            }
                    }
                    
                }).catch(error => {
                    console.log(error)
                    console.log(error.response)
                })
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

    async function updateJwtToken() {
        // let promise = new Promise((resolve, reject) => {

        //     if (user.refreshJwt !== null) {
        //         console.log("updateToken!")
        //         const headers = {
        //             'Content-Type': 'application/json; charset=UTF-8',
        //         }
        //         axios.post(proxy + '/api/auth/refreshjwt', { "refreshJwt": user.refreshJwt },
        //             { headers: headers, withCredentials: true })
        //             .then(res => {
        //                 props.editCurrentUser(res.data)
        //                 resolve(true)

        //             })
        //             .catch(error => {
        //                 console.log(error)
        //                 resolve(false)                       
        //             })
        //     }
        //     resolve(false)         
        // })

        // let result = await promise;
        // return result;
        let promise = new Promise((resolve, reject) => {
            securityApi.updateJwtToken({ "refreshJwt": user.refreshJwt }).then(res => {
                console.log(res)
                props.editCurrentUser(res.data)
                resolve(true)
            })
                .catch(error => {
                    console.log(error)
                    console.log(error.response)
                    resolve(false)
                })
        })
        const result = await promise;
        return result;

    }

    if (r) {
        return <Redirect to='/signin' />;
    }

    return (
        <>
            {g ? (
                props.children
            ) : (
                    <LinearProgress />

                )}
        </>
    )

}

const mapStateToProps = function (state) {
    return {
        user: state.currentUser.user,
    }
}
export default connect(mapStateToProps, { editCurrentUser, setAccessProfiles })(GrantAccess)