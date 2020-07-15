import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useInterval from 'react-useinterval';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";
import { Link as LinkRoute } from 'react-router-dom';
import {editCurrentUser} from "../reducers/currentUser";
import { proxy } from "./Conf";
import { useTranslation } from 'react-i18next';
import LngSelect from './LngSelect'
import Copyright from './Copyright'
import { reduxForm } from 'redux-form';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
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
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function SignIn(props) {
    const classes = useStyles();
    let history = useHistory();
 //   const { handleSubmit } = props;
    const [form, setState] = useState({
        username: '',
        password: ''
    });

    const [open, setOpen] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [start, setStart] = useState(false);
    const [text, setTextAlert] = useState('null');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const updateField = e => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    useInterval(
        () => {
            setSubmitDisabled(false)
        },
        start ? 3000 : null
    );

    const { t } = useTranslation();

    const SignIn = () => {     
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        }
        axios.post(proxy + '/api/auth/signin', form, { headers: headers, withCredentials: true })
            .then(res => {
                
                props.editCurrentUser(res.data)
                console.log(res)
                history.push('/workflow')
                
            })
            .catch(error => {
                if (error.response !== undefined) {
                    if (Number(error.response.data.status) === 401)
                        setTextAlert(t('ОшибкаВход.1'))
                    else
                        setTextAlert(t('ОшибкаВход.2'))
                } else {
                    setTextAlert(t('ОшибкаВход.2'))
                }
                console.log(error)
                setOpen(true);
                setStart(true);
            })
            
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitDisabled(true);
        SignIn();
    }

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {text}
                </Alert>
            </Snackbar>

            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <div className={classes.paper}>
                    <Grid container spacing={3} >

                        <Grid item xs={12} sm={6}>
                            <Box display="flex" justifyContent="center" >
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>

                            </Box>
                            <Box display="flex" justifyContent="center"  >
                                <Typography component="h1" variant="h5">
                                    {t('Вход.1')}
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LngSelect />
                        </Grid>
                    </Grid>



                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label={t('ИмяПользователя.1')}
                            name="username"
                            autoComplete="username"
                            value={form.username}
                            onChange={updateField}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t('Пароль.1')}
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={updateField}
                            autoComplete="current-password"
                        />
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={submitDisabled}
                        >
                            {t('Войти.1')}
                        </Button>
                        <Grid container>
                            {/*
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {t('ЗабылиПароль.1')}
                                </Link>
                            </Grid>
                            */}
                            <Grid item>
                                <LinkRoute to="/signup">
                                    {t('НетАккаунтаРегистрация.1')}
                                </LinkRoute>
                            </Grid>
                        </Grid>
                    </form>
                </div>

                <Box mt={8}>

                    <Copyright />

                </Box>
            </Container>
        </div>

    );
}
//export const SignInReduxForm = reduxForm({form:"signin"})(connect(null,{editCurrentUser})(SignIn))
export default connect(null,{editCurrentUser})(SignIn);