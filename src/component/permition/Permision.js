import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import Tableuser from './Tableuser'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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




function Permision({users}) {
    const classes = useStyles();
    const [user,setuser]=useState([])

    useEffect(() => {
         async function fetchdata() {
             const u= await users ;
           setuser(u)
           return u 
         }
         fetchdata()
    }, [users])
    console.log(user)
 
    return (
        <div  className={classes.root} >
            <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          perm   
          
          <Tableuser user={user} />
          </Paper>
        </Grid>
        </Grid>
           
        </div>
    )
}
 const mapStateToprops=(state)=>{
     

    return {
          users:state.firestore.ordered.user
    }
 }

export default compose(
    connect( mapStateToprops),
    firestoreConnect(()=>[
        {collection:'user'}
    ])
)(Permision)
