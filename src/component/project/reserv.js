import React from 'react'
import { connect } from 'react-redux'
import {useEffect,useState} from 'react'
import {compose} from 'redux'
import {reservcl,snapdata} from '../../store/actions/projectActions'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Drclinc from './Drclinc'

const useStyles = makeStyles((theme) => ({
root: {
flexGrow: 1,
marginTop:20,
marginLeft:160

},
paper: {
padding: theme.spacing(2),
textAlign: 'center',
color: theme.palette.text.secondary,
},
}));
function Reserv(props) {
const classes = useStyles();
const drid= props.match.params.id
const {clinc}=props.location.state.dr
const {reservcl,drres,pationt}=props

const [state, setstate] = useState([])
const [user,setuser]=useState([])
const [change,setchange]=useState(false)

const fetchdata=async()=> {

const data= await reservcl(clinc)
const user= await snapdata()

data && data.forEach(item =>{
console.log("you r in fetchData",item)

})
setstate(data)
setuser(user)
// return data
}
  const refresh=()=>{
      setchange(true)
  }
useEffect(() => {
fetchdata()
//if(pationt){
  //  localStorage.setItem('user_cl',JSON.stringify(pationt))
  //  setuser(JSON.parse(localStorage.getItem('user_cl')))
  //  } 
    if(change){
        setchange(false)
    }
},[change])


/// state.map(item =>{
// console.log('item00',item) 
// })
console.log('chan',state)
state && state.map(i => {
console.log('id',i)
return i
})

return (
<Grid container className={classes.root} spacing={2} >
<Grid item xs={9} >
<Paper className={classes.paper}>
</Paper>
</Grid>
<p> <Button variant="contained" >Refreish</Button> </p> 
{state && state.map(c=>{
console.log('cc',c.id)
console.log('da',c.data().person)// review project action 
return user && user.map(u=>{
console.log('user',u.data().name)
return u.id ===c.data().person?  <Grid item xs={9} key={u.id} > <Drclinc list={c} pationt={u}  stop={refresh}  /></Grid> : null
})
})}
</Grid>
)
}

const mapDispatchToProps = (dispatch)=>{
return{
reservcl:(clinc)=>dispatch(reservcl(clinc))
}

}

const mapStateToProps = (state)=>{
console.log('DRSTAT',state.drresvReducer.state)
return{
drres:state.drresvReducer.state,
pationt:state.firestore.ordered.projects
}
}

export default compose(connect(mapStateToProps,mapDispatchToProps))(Reserv)

