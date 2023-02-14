import React ,{Component,state} from 'react' ;
import Notification from './Notification'
import ProjectList from '../project/ProjectList'
import {connect} from 'react-redux'
import { firestoreConnect, isEmpty} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect,Link} from 'react-router-dom'
import {snapdata} from '../../store/actions/projectActions'
import SearchBar from './SearchBar';
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Clinics from '../project/Clinics'
import moment from 'moment';


class Dashbord extends Component{

    constructor(props){
        super(props)
        this.state={projects:null ,

                     idperson:''   }

    }
     
      
    
    fetchdata=async(time,id)=>{
        const pro=await snapdata(time,id)
         this.setState({projects:pro})}
      
    componentDidMount(){
        const d= moment().format('M,D,YYYY')
        const  time = moment(d).subtract(2, 'months').toDate();
             this.fetchdata(time,null)
  }
 
     handelsubmit = (e)=>{
        e.preventDefault();
     
     }  
  handelchange=(e)=>{
      const  id=e.target.value;

      this.setState({idperson:id})
      


  }

    handelSearch=(id)=>{
        console.log('xxxxxx',id)
        if(id != ''){
            this.fetchdata(null,id)
        }
        else{
            this.componentDidMount()
        }
       


    }
   
    render(){
        
        
       // console.log(this.props)
      const {auth,notifications,users,dr} =this.props
         // console.log("tel me what",notifications)
          if(!auth.uid || undefined )return  <Redirect to='/signin' />
             
     //  console.log('CL',snapdata)

          const x1=(users)=>{
            const  projectarry=[]

            console.log('the user admin is a',users)

              if(users && users.length>0){
                return (<div > 
                    <Clinics />
                   <SearchBar   handelSearch={this.handelSearch} />
                  
                   
                <ProjectList  projects={this.state.projects}/>
                </div>
                )

              }
              else{
               this.state. projects && this.state.projects.map(project=>{
                      if(project.data().authorId===auth.uid){

                        return  projectarry.push(project)
                     
                 }})
              }
             return (
                 <Typography component="div">
                     <Box  textAlign="center" m={1}>
                     {dr && dr[0]?<Link to={{pathname:'/reserv/'+dr[0].Id,state:{dr:dr[0]} }}>
                    <Button variant="contained" color="primary">  RESERVIATION  </Button>
                     </Link>:null}
                     </Box>
                     
                    
                     <ProjectList  projects={projectarry}/>
                 </Typography>
            
             )


          }
          

        
         
          
        return(
            <div className='dashbord container'> 
            <div className='row'>
                <div className='col s12 m6'>
                    { x1(users)}
                </div>
                <div className='col s12 m5 offset-m1'>
                    <Notification notifications={notifications} />
                </div>

            </div>

            </div>
        )
    }
}
const mapStateToprops=(state)=>{
  console.log('state',state);
   return {
       projects:state.firestore.ordered.projects,
       auth:state.firebase.auth,
       notifications:state.firestore.ordered.notifications,
       users:state.firestore.ordered.user,
     // clinc:state.firestore.data.clinc,
       dr:state.firestore.ordered.dr

   }
}
const mapDispatchToProps =(dispatch)=>{
    return{
     //  snapdata:(idn)=>dispatch(snapdata(idn))
    }
}


export default compose(
    connect(mapStateToprops,mapDispatchToProps),
    firestoreConnect(ownProps=>{
        //  console.log('DoctorCloinc is',ownProps)
             // const date=moment().format('LLLL').subtract(2, 'months').toDate();
                
            // where:['createdAt','<',timestamp],
            // console.log('date',timestamp)
         return([
        {collection:'notifications',limit:3,orderBy:['time','desc']},
        {collection:'user',where:[['Id','==',ownProps.auth.uid],['type','==','admin']]},
        {collection:'user', where:[['Id','==',ownProps.auth.uid],['type','==','dr'] ], storeAs: 'dr'
           },
        // {collectionGroup:'clinc'},

        ])
    })
)(Dashbord) ;

//{collection:'projects',
      ///  orderBy:['createdAt','desc']},