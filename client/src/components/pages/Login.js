import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import { makeStyles, Container, Grid, TextField, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        height: "75vh",
        justifyContent: "center",
        alignItems: "center"
    },
    gridContainer: {
        height: "inherit",
    },
    bodyText: {
        color: theme.palette.secondary.main
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none"
    }
}));

const Login = props => {
    const [ errors, setErrors ] = useState({});
    const emailRef = useRef();
    const passwordRef = useRef();
    const classes = useStyles();

    useEffect(() => {
        if(props.auth.isAuthenticated) props.history.push("/dashboard");
        if(props.errors !== errors) setErrors(props.errors);
    }, [props, errors]);

    const onClick = e => {
        e.preventDefault();

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // console.log(userData);
        props.loginUser(userData);
    }

    return (
        <Container className={classes.container} maxWidth={false} disableGutters={true}>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.gridContainer}>
                <Grid container direction="column" justify="center" alignItems="flex-start" item xs={10} sm={5} lg={2}>
                    <Link to="/" className={classes.link}><ArrowBack /> Back to home</Link>
                    <h4>
                        <b>Login</b>
                    </h4>
                    <p className={classes.bodyText}>
                        Don't have an account? <Link to="/register" className={classes.link}>Register</Link>
                    </p>
                </Grid>
                <Grid container item xs={10} sm={5} lg={2}>
                    <Grid item xs={12}>
                        <TextField id="email" label="Email Address" variant="outlined" fullWidth required type="email" inputRef={emailRef} error={Boolean(errors.email) || Boolean(errors.incorrect)} helperText={errors.email || errors.incorrect} />
                    </Grid>
                </Grid>
                <Grid container item xs={10} sm={5} lg={2}>
                    <Grid item xs={12}>
                        <TextField id="password" label="Password" variant="outlined" fullWidth required type="password" inputRef={passwordRef} error={Boolean(errors.password) || Boolean(errors.incorrect)} helperText={errors.password} />
                    </Grid>
                </Grid>
                <Grid item>
                    <Button className={classes.btn} variant="contained" color="primary" onClick={onClick}>Login</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);