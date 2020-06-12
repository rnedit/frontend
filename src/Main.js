import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Signup from './SignUp';

export default function Main() {
    return (
        <Router> {/* The Switch decides which component to show based on the current URL.*/}
            <Route path='/api/test/user' component={Signup}></Route>
        </Router>

    );
}