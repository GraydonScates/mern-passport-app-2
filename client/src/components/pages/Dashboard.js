import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import { makeStyles, Container, Grid, Button } from '@material-ui/core';

import API from '../../utils/apiHelper';

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
        color: theme.palette.secondary.contrastText
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none"
    }
}));

const Dashboard = props => {
    const { user } = props.auth;
    const classes = useStyles();

    useEffect(() => {
        API.getUser().then(res => console.log(res)).catch(err => console.log(err));
    }, []);

    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    }

    return (
        <Container className={classes.container}>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.gridContainer}>
                <Grid container direction="column" justify="center" alignItems="center" item>
                    <h4>
                        <b>Hey there,</b> {user.name.split(" ")[0]}
                        <p className={classes.bodyText}>
                            You are logged into a full-stack{" "} <b>MERN</b> app
                        </p>
                    </h4>
                    <Button variant="contained" color="primary" onClick={onLogoutClick}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser })(Dashboard);