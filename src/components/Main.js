import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as LinkRoute } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    };

    render() {
        return (
            <>
            <div>Главная страница </div>
            <div><LinkRoute to="/signin">Вход</LinkRoute></div>
            <div><LinkRoute to="/signup">Регистрация</LinkRoute></div>
            <div><LinkRoute to="/workflow">СЭД</LinkRoute></div>
            
            </>
            
        )
           
       
    }

}

export default connect()(Main)