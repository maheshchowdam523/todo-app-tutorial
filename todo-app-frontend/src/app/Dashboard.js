import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react";
import PieChart from "./PieChart";
import clsx from 'clsx';

const inlineStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
        paddingBottom: 36
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        minWidth: 330,
        height: 165
    },
    strike: {
        textDecoration: "line-through"
    },
    completedTasks: {
        backgroundColor: "#5285EC"
    },
    totalTasks: {
        backgroundColor: "#E8ECEC"
    },
    svgSize: {
        width: 10,
        height: 10, marginRight: 12
    }
}));

const Dashboard = (props) => {
    const {data: {totalCount, completedCount, recentTasks}} = props;
    const classes = inlineStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" align="left" style={{color: "#7A7D7E"}}>Tasks Completed</Typography>
                        <br/>
                        <Typography variant="h2" align="left" style={{color: "#5285EC"}}
                                    display="inline">{completedCount}</Typography>
                        <Typography variant="h5" component="h3" style={{color: "#7A7D7E"}}
                                    display="inline">/ {totalCount}</Typography>
                    </Paper>
                </Grid>
                <Grid item md>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" align="left" style={{color: "#7A7D7E"}}>Latest Created
                            Tasks</Typography>
                        <ul>
                            {recentTasks && recentTasks.map((task, i) => <li key={'list-task' + i}
                                                                             className={task.completed && classes.strike}>{task.name}</li>
                            )}
                        </ul>
                    </Paper>
                </Grid>
                <Grid item md>
                    <Paper className={classes.paper} style={{textAlign: 'center'}}>
                        <PieChart
                            data={[{value: totalCount}, {value: completedCount}]}
                            width={200}
                            height={100}
                            innerRadius={0}
                            outerRadius={50}
                        />
                        <Typography variant="body2" align="left" style={{color: "#5285EC"}}>
                            <svg className={clsx(classes.completedTasks, classes.svgSize)}/>
                            Completed Tasks</Typography>
                        <Typography variant="body2" align="left" component="h3" style={{color: "#7A7D7E"}}>
                            <svg className={clsx(classes.totalTasks, classes.svgSize)}/>
                            Total Tasks</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
export default Dashboard;
