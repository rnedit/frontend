import {Component} from "react";
import {Consumer} from './UserContext'
class UserProvider extends Component {
    render() {
        const {children} = this.props;
        return (
            <Consumer>

            </Consumer>
        )
    }
}