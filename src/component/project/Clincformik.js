import React, { useState ,useEffect} from 'react'
import {connect} from 'react-redux'
import { useHistory } from "react-router";
import { Formik, Form} from 'formik';
import * as yup from 'yup'
import { TextField } from 'formik-material-ui';
import FormikControl from './formikControl/FormikControl'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFunUtils from '@date-io/date-fns'
import {
    DatePicker,
  } from 'formik-material-ui-pickers';

  import {creatClinc,newclic_R} from '../../store/actions/projectActions'
import {List} from './formikControl/InputControl'

const Clincformik = ({ person,close ,creatClinc, newclic_R}) => {
     
   const [state, setstate] = useState([])
   
    const effect=async()=>{
        const data=await newclic_R()
        data && data.forEach(item =>{
            console.log("you r in fetchData",item)
            
            })

            setstate(data)



    }
    useEffect(() => {
      effect() 
     
    }, [])
      

    
    const history=useHistory()
    const initialValues = {  person: person, name: '', price: '', resip: '', done: false, date:new Date() }

    const validationSchema = yup.object().shape({
        name: yup.string().required('requird'),
        price: yup.number().required().positive().integer(),
    })

    const onSubmit = (values, { setSubmitting }) => {
        console.log('newwwwww',values)
       creatClinc(values)
       // history.push(`/project/${person}`)
     
        setTimeout(() => {
          
            alert(JSON.stringify(values, null, 2));
           
            setSubmitting(false);
            
            close()
          }, 400)
        
       
    }



    return (

        <Formik
            initialValues={initialValues}

            validationSchema={validationSchema}

            onSubmit={onSubmit}

        >
            {
                formik => (
                  <MuiPickersUtilsProvider utils={DateFunUtils} >
                    <Form>
                      
                          <List  
                           name='name'
                           label='Clinc'
                           options={state} />
                       
                    <FormikControl
                       component={TextField}
                         control='input' 
                         type='text'
                          name='price'
                           label='price' />
                            <FormikControl  
                       component={DatePicker}
                         control='input' 
                         type='text'
                          name='date'
                           label='Date' />

                 <button  type='submit'  >Submit</button>
                    </Form>
                    </MuiPickersUtilsProvider >
                )


            }


        </Formik>


    )
}

const mapDispatchToProps=(dispatch)=>{
return {
       creatClinc: value=>(dispatch(creatClinc(value))),
       newclic_R: value=>(dispatch(newclic_R(value)))
    }
    

}



export default connect(null,mapDispatchToProps)(Clincformik)
