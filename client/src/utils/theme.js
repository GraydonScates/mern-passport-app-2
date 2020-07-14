import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#030303",
            light: "#cccccc",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#b5b7ba",
            light: "#e7e9ec",
            contrastText: "#000000"
        },
        black: "#000000",
        white: "#ffffff",
    }
});

export default theme;