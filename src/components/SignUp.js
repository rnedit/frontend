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
import { Link as LinkRoute } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useInterval from 'react-useinterval';
import axios from "axios";
import { proxy } from "./Conf";
import { useTranslation } from 'react-i18next';
import LngSelect from './LngSelect'
import Copyright from './Copyright'


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
        marginTop: theme.spacing(3),
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {

    const { t } = useTranslation();

    let history = useHistory();

    const classes = useStyles();

    const [form, setState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConf: ''
    });
    const [open, setOpen] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [start, setStart] = useState(false);
    const [startTimerToSignIn, setStartTimerToSignIn] = useState(false);
    const [text, setTextAlert] = useState('null');
    const [typeSeverity, setTypeSeverity] = useState('error');

    const minLength = "3";
    const maxLength = "50";


    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const errorText = form.firstName.length - 1 < minLength;
    const errorText1 = form.lastName.length - 1 < minLength;
    const errorText2 = form.username.length - 1 < minLength;
    const errorText3 = (form.email.length - 1 < minLength) || !validateEmail(form.email);
    const errorText4 = form.password.length - 1 < minLength;
    const errorText41 = form.passwordConf.length - 1 < minLength || !validarePassword();

    function validarePassword() {
        if (form.passwordConf === form.password && form.password !== "")
            return true
        else
            return false
    }

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

    useInterval(
        () => {
            setStartTimerToSignIn(false)
            history.push('/signin')
        },
        startTimerToSignIn ? 3000 : null
    );

    const SignUp = () => {
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        }
        axios.post(proxy + '/api/auth/signup', form, { headers: headers, withCredentials: true })
            .then(res => {
                setTextAlert(t("СообщенияРегистрация.1"))
                setTypeSeverity("success")

                setOpen(true);
                setStartTimerToSignIn(true)
            })
            .catch(error => {
                if (error.response !== undefined) {
                    if (Number(error.response.data.code) === 0)
                        setTextAlert(form.username + t("СообщенияРегистрация.2"))
                    else
                        if (Number(error.response.data.code) === 1)
                            setTextAlert(form.email + t("СообщенияРегистрация.3"))
                    console.log(error)
                    console.log(error.response.data)
                } else {
                    setTextAlert(t("СообщенияРегистрация.4"))
                }
                setOpen(true);
                setTypeSeverity("error")
                setStart(true);

            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitDisabled(true);
        SignUp();
    }

    return (
        <div className={classes.root}>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeSeverity}>
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
                                    {t('Регистрация.1')}
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LngSelect />
                        </Grid>
                    </Grid>



                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errorText}
                                    helperText={errorText ? t("СообщенияРегистрация.5") : t("СообщенияРегистрация.6")}

                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={t('Регистрация.2')}
                                    value={form.firstName}
                                    onChange={updateField}
                                    inputProps={{ minLength: { minLength }, maxLength: { maxLength } }}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errorText1}
                                    helperText={errorText1 ? t("СообщенияРегистрация.5") : t("СообщенияРегистрация.6")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label={t('Регистрация.3')}
                                    name="lastName"
                                    autoComplete="lname"
                                    value={form.lastName}
                                    inputProps={{ minLength: { minLength }, maxLength: { maxLength } }}
                                    onChange={updateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errorText2}
                                    helperText={errorText2 ? t("СообщенияРегистрация.5") : t("СообщенияРегистрация.6")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label={t('Регистрация.4')}
                                    name="username"
                                    autoComplete="UserName"
                                    value={form.username}
                                    inputProps={{ minLength: { minLength }, maxLength: { maxLength } }}
                                    onChange={updateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errorText3}
                                    helperText={errorText3 ? t("СообщенияРегистрация.5") : t("СообщенияРегистрация.6")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type='email'
                                    id="email"
                                    label={t('Регистрация.5')}
                                    name="email"
                                    autoComplete="email"
                                    value={form.email}
                                    inputProps={{ minLength: { minLength }, maxLength: { maxLength } }}
                                    onChange={updateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errorText4}
                                    helperText={errorText4 ? t("СообщенияРегистрация.5") : t("СообщенияРегистрация.6")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label={t('Регистрация.6')}
                                    type="password"
                                    id="password"

                                    value={form.password}
                                    inputProps={{ minLength: { minLength }, maxLength: { maxLength } }}
                                    onChange={updateField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errorText41}
                                    helperText={errorText41 ? t("СообщенияРегистрация.7") : t("СообщенияРегистрация.6")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="passwordConf"
                                    label={t('Регистрация.7')}
                                    type="password"
                                    id="passwordConf"

                                    value={form.passwordConf}
                                    inputProps={{ minLength: { minLength }, maxLength: { maxLength } }}
                                    onChange={updateField}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={submitDisabled}
                        >
                            {t('Регистрация.1')}
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <LinkRoute to="/signin">
                                    {t('Регистрация.8')}
                                </LinkRoute>
                            </Grid>
                        </Grid>
                    </form>
                </div>

                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>

    );
}