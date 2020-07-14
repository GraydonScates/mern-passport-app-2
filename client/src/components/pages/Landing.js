import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Container, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        height: "75vh"
    },
    gridContainer: {
        height: "inherit"
    },
    bodyText: {
        fontSize: "20px",
        color: theme.palette.secondary.main
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none"
    }
}));

const Landing = props => {
    const classes = useStyles();
    
    return (
        <Container className={classes.container}>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.gridContainer}>
                <Grid container direction="column" justify="center" alignItems="center" item>
                    <h4>
                        <b>Build</b> a login/auth app with the <b>MERN</b> stack from scratch
                    </h4>
                    <p className={classes.bodyText}>
                        Create a (minimal) full-stack app with user authentication via passport and JWTs
                    </p>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center" item>
                    <Link to="/register" className={classes.link}>
                        <Button variant="contained" color="primary">Register</Button>
                    </Link>
                    <Link to="/login" className={classes.link}>
                        <Button>Login</Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Landing;