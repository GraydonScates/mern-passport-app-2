import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import theme from './utils/theme';

import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/partials/Navbar';
import Landing from './components/pages/Landing';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

const useStyles = makeStyles(theme => ({
    app: {
        display: "flex",
        height: "100%",
        flexDirection: "column"
    },
    main: {
        display: "flex",
        flexGrow: 1,
        overflowX: "hidden",
        overflowY: "auto"
    }
}));

const App = () => {
    const classes = useStyles();

    return(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <div className={classes.app}>
                        <Navbar />
                        <main className={classes.main}>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            </Switch>
                        </main>
                    </div>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
