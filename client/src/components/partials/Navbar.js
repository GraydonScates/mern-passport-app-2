import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar } from '@material-ui/core';
import { Code } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    navbar: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "none"
    },
    pageLink: {
        color: theme.palette.white,
        textDecoration: "none"
    }
}));

const Navbar = props => {
    const classes = useStyles();

    return (
        <AppBar className={classes.navbar} position="static">
            <Toolbar>
                <Link to="/" className={classes.pageLink}>
                    <Code /> MERN
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;