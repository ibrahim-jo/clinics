import React from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
function ProjectSummary({project,proid}) {
    const classes = useStyles();
    const dob=moment(new Date(project.bairth))
    const todaydate=moment(new Date())
    const duration=moment.duration(todaydate.diff(dob))
 // console.log('Date of bairth',duration.years(),moment(project.createdAt.toDate().toISOString()).calendar())
    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
            <Avatar></Avatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                   Name: {project.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                   ID: {project.idn}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Mobile:{project.mobile}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" >
                   Age: {duration.years()}Y
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                  <Typography variant="subtitle1">{moment(project.createdAt.toDate().toISOString()).calendar()}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
       
    )
}

export default ProjectSummary
