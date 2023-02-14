import React, {useState,useEffect} from 'react'
import { Formik, Form} from 'formik';
import * as yup from 'yup'
import FormikControl from '../project/formikControl/FormikControl'
import {List} from '../project/formikControl/InputControl'
import  {Redirect} from 'react-router-dom'
import {connect}from 'react-redux'
import {signUp}from '../../store/actions/authAction'
import {newclic_R} from '../../store/actions/projectActions'
import { makeStyles,Grid,Typography,Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
     
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
     
    },
    paperWrapper: {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
    }
  }));
  

export const SignUp2=({newclic_R,signUp,auth,authError})=>{
    const classes = useStyles();
    const [state, setstate] = useState([])
   
    const effect=async()=>{
        const data=await newclic_R()
        data && data.forEach(item =>{
           // console.log("you r in fetchData",item)
            
            })

            setstate(data)

    }
    useEffect(() => {
        effect() 
       
      }, [])

    const initialValues={email:'', password:'', first:'',last:'',clinc:''}
    const  validationSchema= yup.object().shape({
        email:yup.string().email('invalid').required(),
        password:yup.string().required().min(6),
        first:yup.string().required(),
        last:yup.string().required(),
        clinc:yup.string().required()

    })
    const onSubmit=(values,{setSubmitting,resetForm})=>{
        console.log('Signup2',values)
        signUp(values)
        setTimeout(() => {
            alert(JSON.stringify(values,null,2))
            setSubmitting(false);
         resetForm();
        }, 400);


    }
    
    if(auth.uid  || authError)return <Redirect to='/' />

    return(
      
       <Grid container  style={{background:'white'}}>
             
      <Grid item xs={12} > 
      <Container maxWidth='md' >
      <div className={classes.formWrapper}>
     

  

       <Formik 
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={onSubmit}
         >
           {formik=>(
               <Form>
                   <Grid container spacing={2} >
                  

                 <Grid item xs={12}>
                     <Typography>
                         ......Details......
                     </Typography>
                     </Grid>
                     <Grid item xs={6}>
                     <FormikControl  
                   control='textfield' 
                   name='first'
                   label='First'
                   />
                     </Grid>
                     <Grid item xs={6}>
                     <FormikControl  
                   control='textfield' 
                   name='last'
                   label='Last'
                   />
                     </Grid>
                     <Grid item xs={12}>
                     <FormikControl  
                   
                   control='textfield' 
                   name='email'
                   label='Email'
                   />
                     </Grid>
                  
                   <Grid item xs={12} > 
                   <FormikControl  
                   control='textfield' 
                   name='password'
                   label='Password'
                   type='password'
                   />
                    </Grid>
                   < Grid item xs={12}>
                   <List 
                    name='clinc'
                    label='Clinc'
                    options={state}
                   />
                   </Grid>
                  <Grid item xs={12}>
                      <FormikControl
                      control='Button'
                      type='submit'

                       >
                           Submit
                       </FormikControl>
                  </Grid>

                  </Grid>
               </Form>
           )}
           </Formik>
           </div>
           </Container>
           </Grid>
          
           </Grid>
         )

}
const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth,
        authError:state.auth.authError
    }
}

 const mapDispatchToProps=(dispatch)=>{
     return {
        signUp:(newUser)=> dispatch(signUp(newUser)),
        newclic_R: value=>(dispatch(newclic_R(value)))

     }
 }
export default connect(mapStateToProps,mapDispatchToProps)(SignUp2)