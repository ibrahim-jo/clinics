import React, { Component, useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, Redirect, Route } from 'react-router-dom'
import moment from 'moment'
import  {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Editemodal from './Editemodal'
import ClincModal from './Clincmodal'
import Clinclist from './Clinclist'
import {snapclinc,clincOfId} from '../../store/actions/projectActions'

//import M from 'materialize-css/dist/js/materialize.min.js'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    textAlign: 'center'
  },
}))

function DetailsProject(props) {
  const classes = useStyles()

  const { project, auth, clincOfId,snapclinc,reserv } = props
  const { id } = props.match.params;
  const [x,setx] = useState([])
  const [change,setchange]=useState(false)

  const  cl=async(id)=>{
     const x= await clincOfId(id) 

     
     setx(x)
   }
 
  const refresh=()=>{
    setchange(true)
}
  useEffect(() => {
    cl(id)
    if(change){
      setchange(false)
  }
//console.log('count')
//console.log('id',snapclinc(id))

  },[change])


  if (!auth.uid) return <Redirect to='/signin' />

  if (project) {
    
       console.log('xxx',id)
    return (


      <div className='container section project-details'>
        <div className='card z-depth-0'  >
          <div className='card-content'  >

            <span className='card-title' >
            Name:  {project.name}
            </span>
            <ClincModal pId={id} />
            <p>Mob:{project.mobile}</p>
            <p> ID: {project.idn}</p>
          </div>

          <div className='card-action grey lighten-4 green-text'>

            <div>posted by {project.authorFirstName} </div>
            <div >  {moment(project.createdAt.toDate()).calendar()}</div>
          </div>



        </div>
        <Clinclist list={x}  />


      
        <Grid container   spacing={3} className={classes.icon}>
          <Grid xs={4} className={classes.icon}>
          <Editemodal project={project} proid={id} />
          </Grid>

      <Grid    item  xs={4} className={classes.icon} >
       
      </Grid>

      <Grid xs={4} className={classes.icon}>

      </Grid>
      </Grid>
       


      </div>

    )
  }
  else {
    return (
      <div className='container center'><p> Loading....</p></div>
    )
  }


}

const mapDispatchToProps =(dispatch)=>{
  return{
    snapclinc:(id)=>dispatch(snapclinc(id)),
    clincOfId:(id)=>dispatch(clincOfId(id))
  }
}
const mapStateToprops = (state, ownprops) => {

  const { id } = ownprops.match.params
  console.log('own', state)
  const projects = state.firestore.data.projects
  const project = projects ? projects[id] : null
 // const cl = state.firestore.data.clinc;
  //console.log('obj1', cl)

  return {
    project: project,
    auth: state.firebase.auth,
   // cl: cl,
    reserv: state.reserv.addclinc
  }
}



export default compose(
  connect(mapStateToprops,mapDispatchToProps),
  firestoreConnect(owner => {
    const { id } = owner.match.params
    return (
      [
        { collection: 'projects' },
       // { collectionGroup: 'clinc', where: ['person', '==', id]}
      ])
  })
)(DetailsProject)



