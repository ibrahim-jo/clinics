import React,{useState} from 'react'
import {Container,Button,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useFormik} from 'formik'
import *  as yup from 'yup'
import {connect} from 'react-redux'
import {newclinc} from '../../store/actions/projectActions'
const useStyles = makeStyles((theme) => ({
    root: {
        //  display: 'flex',
          flexGrow: 1,
        
        }
    
  }));
 function  Clinics({newclinc}) {
    const classes = useStyles();
    const formik=useFormik({
      initialValues:{
        name:''

      },
      validationSchema:yup.object({
        name: yup.string() .max(15, 'Must be 15 characters or less')

         .required('Required')
      }),
        onSubmit: (values,{setSubmitting}) =>{

          alert(JSON.stringify(values,null,2))
           newclinc(values)
          setSubmitting(false);
          formik.resetForm();
        }
    })
    return (
       <Container className={classes.root} >
         <form onSubmit={formik.handleSubmit} >

         <Button variant="contained"
       type ='submit'
       color="primary"   style={{marginTop:30,marginRight:5}}
        > Add New Clinc</Button>
      <TextField 
      id="name" 
        name='name'
         label="new clinc"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.name} />  
         {formik.touched.name && formik.errors.name ?<div>{formik.errors.name}</div>:null}
        
         </form>
           </Container>
    )
}

const mapDispatchToProps = (dispatch)=>{
  return {
    newclinc:  value=>(dispatch(newclinc(value)))
  }
   
}

export  default connect(null,mapDispatchToProps)(Clinics)
