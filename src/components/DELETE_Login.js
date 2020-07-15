import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import axios from "axios";

//import {editCurrentUser} from "../components/";
import Link from "@material-ui/core/Link";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Login extends React.Component {
    // static contextType = UserContext
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            loggedIn : false,
            username: '',
            password:'',
            user:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePWChange = this.handlePWChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.proxy = "http://localhost:8080";

        this.classes = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));

    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }
    handlePWChange(event) {
        this.setState({password: event.target.value});
    }

    SignIn(){
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        }
        axios.post(this.proxy+'/api/auth/signin',this.state, {headers:headers, withCredentials: true})
            .then(res => {
                //editCurrentUser(res.data)

                this.setState({user:res.data})
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.SignIn();

    }



    render() {

        return (

            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <div className={this.classes.paper}>
                    <Avatar className={this.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">

                        Sign in
                    </Typography>
                    <form className={this.classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Email Address"
                            name="login"
                            autoComplete=""
                            autoFocus
                            value={this.state.username} onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password} onChange={this.handlePWChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>

                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>

            </Container>
        )
    }


    // }


}

export default connect(editCurrentUser)(Login);;