import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { TablePagination } from '@material-ui/core';
 export function Add_Action(props) {
     const addclick=(e)=>{
         props.onClick(e,'add')
     }

    return (
        <Tooltip title="Add">
             <IconButton color="primary" onClick={addclick}>
          <AddIcon />
        </IconButton>
        </Tooltip>
       
    )
}

export function Edit_Action(props) {
    const editClick=(e)=>{
        props.onClick(e,'edit')

    }
    return(
       <Tooltip  title="Edite">
           <IconButton  color='primary' onClick={editClick} >
        <EditIcon />
    </IconButton>
       </Tooltip>
        
      

    )}

 export  const Updateuser=(data)=>{
     return(dispatch,getstate,{getFirebase})=>{

        const firestore=getFirebase().firestore();
        console.log(data);
         firestore.collection('user').doc(data.id).update({type:data.data})
         .then(()=>{
               dispatch({type:'UPDATE_PS'})
         })
         .catch((err)=>{
             dispatch({type:'UPDATE_PF' ,err})
         })

     }
 }