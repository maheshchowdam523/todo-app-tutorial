import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";

const THEME = createMuiTheme({
    typography: {
        "fontFamily": `Nunito Sans`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    primary: {
        main: "#5285EC"
    },
    secondary: {
        main: "grey"
    },
    overrides: {
        MuiButton: {
            contained: {
                color: "white",
                backgroundColor: "#5285EC",
                "&:hover": {
                    backgroundColor: "#5285EC",
                    // Reset on touch devices, it doesn't add specificity
                    "@media (hover: none)": {
                        backgroundColor: "#5285EC"
                    }
                }
            }
        }
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={THEME}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </MuiThemeProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
