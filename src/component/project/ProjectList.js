import React from 'react'
import ProjectSummary from './ProjectSummary'
import {Link} from 'react-router-dom'
import {removeProject} from '../../store/actions/projectActions'
import {connect} from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import  {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Editemodal from './Editemodal'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    icon: {
      textAlign: 'center'
    },
  }));
  
function ProjectList({projects,removeProject}) {
    const classes = useStyles()
  projects && projects.map(project=>{
        console.log('DeletID',project.id)
    });
    const handleremove=(id)=>{
      
      console.log('de',id)
       removeProject(id);
    }
  
    return (
        <div  className='project-list section'> 
        {projects && projects.map((project)=>{
            return(
             
              <div key={project.id}>
                      <Grid  container spacing={3}  className={classes.icon} >
                     <Grid item xs={4} >
                     <DeleteIcon  onClick={()=>handleremove(project.id)}  style={{cursor: 'pointer'}} />
                     </Grid >   
               <Grid  item  xs={4} className={classes.icon}  >
                <Editemodal    project={project.data()} />
               </Grid>
               <Grid  item  xs={4} className={classes.icon}  >
                <Link  to={{pathname:'/print/'+project.id,
                            state:{
                              project:project.data()
                            }}}> 
                <PrintIcon />
                </Link>
               </Grid>
               
               </Grid>
                
              
                <Link  to={'/project/'+ project.id} key={project.id} >
               <ProjectSummary project={project.data()}  proid={project.id}  />
                
                </Link>
                </div>
            )
        })}
                        
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return {
        removeProject:id => dispatch(removeProject(id))

    }

}

export default connect(null,mapDispatchToProps) (ProjectList)
