import React from 'react';
import {Updateproject}from '../../store/actions/projectActions'
import {connect} from 'react-redux'
import { Form,Formik } from 'formik';



const Editformik = ({edite,Updateproject,exit}) => {
  
  const exitmodel=()=>{
     exit()
  }

  return(
 
  
  
  <div>

 
    <Formik

      initialValues={{ title: edite.title, content: edite.content,id:edite.id}}

      validate={values => {

        const errors = {};

        if (!values.title ) {

          errors.title = 'Required';

        } 
        
        if (!values.content ) {

            errors.content = 'Required';
  
          } 
        
        return errors;

      }}

      onSubmit={(values , { resetForm,setSubmitting }) => {
       
          
        Updateproject(values);
          
         
        setTimeout(() => {
          
          alert(JSON.stringify(values, null, 2));
         
          setSubmitting(false);
          resetForm({values:{title:'',
          content:''}})
        
        }, 400);
        exitmodel()

      }}

    >

      {({

        values,

        errors,

        touched,

        handleChange,

        handleBlur,

        handleSubmit,

        isSubmitting,
            
        /* and other goodies */

      }) => (

        <Form onSubmit={handleSubmit}>

          <input

            type="text"

            name="title"

            onChange={handleChange}

            onBlur={handleBlur}

            value={values.title}

          />

          {errors.title && touched.title && errors.title}

          <input

            type="text"

            name="content"

            onChange={handleChange}

            onBlur={handleBlur}

            value={values.content}

          />

          {errors.content && touched.content && errors.content}

          <button type="submit"     disabled={isSubmitting}>

            Submit

          </button>

        </Form>

      )}

    </Formik>

  </div>

)};

const mapDispatchToProps=(dispatch)=>{
  return{
    Updateproject:values=>dispatch(Updateproject(values))
  }
}

export default  connect(null,mapDispatchToProps) (Editformik);