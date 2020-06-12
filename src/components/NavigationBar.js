import React from 'react'
import {AccountConsumer} from "../context/AccountProvider";
import Link from "@material-ui/core/Link";

const NavigationBar = (_props) => (
    <AccountConsumer>
        {({ details: { username } }) => (
            <div>
                <Link to="/">Home</Link>
                <Link to="/account/profile">{username}</Link>
            </div>
        )}
    </AccountConsumer>
)

export default NavigationBar