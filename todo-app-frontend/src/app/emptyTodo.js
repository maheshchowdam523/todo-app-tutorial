import React from "react";
import {Button, Card, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
        height: 50
    }

}));

const EmptyTodo = props => {
    const classes = useStyles();

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
                <Typography variant="h5" component="h2" color="textSecondary" style={{margin: '24px 0'}}>
                    You have no tasks.
                </Typography>
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            props.openUpdateDialog({name: ''});
                            props.setTodo({name: ''});
                        }}
                        startIcon={<AddIcon/>}
                    >
                        New Task
                    </Button>
                </div>
            </CardContent>
        </Card>
    </Grid>
}

export default EmptyTodo;
