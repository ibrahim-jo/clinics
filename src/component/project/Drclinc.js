import React  from 'react'
import { useState } from 'react';
import { updateresip } from '../../store/actions/projectActions'
import moment from 'moment'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent, Typography, TextField, Grid, Devi, IconButton, Button } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  texta: {
    width: 300,
  },
  button: {
    margin: theme.spacing(1),

  }

}));

function Clinclist({ list, pationt ,updateresip,stop}) {

  const classes = useStyles();
  const [state, setstate] = useState(list.data().resip)

  const handelchange = (e) => {
    setstate(e.target.value)

  }
  const handelclick = (e) => {
    e.preventDefault()
    stop()
    //console.log('l',list.id,state)
    //console.log(moment(list.data().date.seconds).toDate())
   updateresip([list.id,pationt.id,list.data().done],state)
  }

  return (


    <Card className={classes.root}>
      <CardHeader
        avatar={""}
        title={pationt.data().name}
        subheader={`B.O.D : ${pationt.data().bairth}`}
        action={
                list.data().done?<CheckCircleOutlineIcon   style={{ color: "green" }} onClick={() => console.log("OK")} />
                 :<CheckCircleOutlineIcon   onClick={() => console.log("OK")} />
            
          
        } />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2"  >
              mobile : {pationt.data().mobile}
            </Typography>
            <Typography variant="body2"  >
              price : {list.price}
            </Typography>
          </Grid>

          <Grid item xs={6}  >
            <TextField className={classes.texta} multiline id="filled-basic" label=" Medical Prescription"
              value={state}
              variant="filled"
              onChange={handelchange} />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={handelclick}
            >
              Save
            </Button>
          </Grid>

        </Grid>
      </CardContent>

    </Card>

  )
      }

    const  mapDispatchToProps = (dispatch) => {

    return {
         updateresip:(val1,val2)=>dispatch(updateresip(val1,val2))
    }
  }



export default  connect(null,mapDispatchToProps) (Clinclist)
