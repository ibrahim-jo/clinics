import React ,{useState,useEffect}from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import PrintIcon from '@material-ui/icons/Print';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Clinclist({list}) {
    const classes = useStyles();
     
            
      return (
        <div>
             { list && list.map(c=>{
               
               return(

                <div className={classes.root}  key={c.id}  >
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                   <Paper className={classes.paper}>
                     <Grid item xs={12} sm container>
                       <Grid item>
                         {c.data().done && c.data().done? <CheckCircleIcon  color="secondary" />:<CheckCircleIcon  />}
                        
                       </Grid>
                     <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                       <Typography gutterBottom variant= "subtitle1" >
                     {c.data().name} 
                     </Typography>
                     <Typography variant="body2" gutterBottom>
                      {moment(c.data().date.toDate()).calendar()}
                </Typography>
                <Typography variant="body2" color="textSecondary" >
                      {c.data().resip?c.data().resip:<span>no resip</span>}
                </Typography>
                     </Grid>
                     
                     </Grid>
                     <Grid item>
              <Typography variant="subtitle1">${c.data().price}</Typography>
            </Grid>
                     </Grid>
                     </Paper>
                </Grid>
                  </Grid>
                  <Link  to={{pathname:'/Toreport1/'+c.data().person,
                            state:{
                              cl:c.data()
                            }}}> 
        <PrintIcon />

        </Link>
                 </div>
                 
               )  })
              }
             
              </div>)
       
    
}

export default Clinclist
