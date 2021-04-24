import React, {useState} from "react";
import {Box, Button, Card, CardContent, Grid, Link, makeStyles, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        borderRadius: 20,
        fontFamily: "Nunito Sans"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    submit: {
        width: '100%',
        height: 50,
        backgroundColor: "#5285EC"
    }

}));

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const LoginPage = props => {
    const classes = useStyles();
    const [username, updateUserName] = useState("");
    const [password, updatePassword] = useState("");

    const handleLogin = () => {
        props.validateUser(username, password);
    };

    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}
    >
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2" color="textSecondary">
                    Login
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => updateUserName(e.target.value)}
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
                    onChange={e => updatePassword(e.target.value)}
                />
                {props.errorMessage && (
                    <Typography color={"error"}>{props.errorMessage}</Typography>
                )}
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="default"
                        className={classes.submit}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </div>

                <Box mt={8}>
                    <Copyright/>
                </Box>
            </CardContent>
        </Card>
    </Grid>
}

export default LoginPage;
