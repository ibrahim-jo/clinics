import React,{useState} from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import {Add_Action,Edit_Action,Updateuser} from './Table_Action'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



 const  Tableuser=({user,Updateuser})=> {
  const classes = useStyles();
const button={
    actions:[Add_Action,Edit_Action]
}
  const [type, settype] = useState({})
  
   const [Editting, setEditting] = useState(false)

   const startediting=(i)=>{
     console.log(i)
     setEditting(i)
   }
   const stopEditting=()=>{
      Updateuser(type)
     setEditting(false)

   }
    const handlechange=(e,id)=>{
      
     
      settype({data:e.target.value,id:id})
     


    }
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">FirstName</TableCell>
            <TableCell align="left">LastName</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user && user.map((row,i) => (
            <TableRow key={i}>
             
              <TableCell align="left">{row.firstName} </TableCell>
              <TableCell align="left">{row.lastName}</TableCell>
              <TableCell align="left">  { (Editting===i)?<TextField name='Type' onChange={e=>handlechange(e,row.id)} value={type.data} />
              : row.type}</TableCell>
              <TableCell aligin="left" >{(Editting===i)?<CheckIcon onClick={e=>stopEditting()} />:<EditIcon onClick={(e)=>startediting(i)} /> }</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 
const mapDispatchToprops=(dispatch)=>{
  return {
     Updateuser:(data)=> dispatch(Updateuser(data))
  }
}

export default connect(null,mapDispatchToprops) (Tableuser);