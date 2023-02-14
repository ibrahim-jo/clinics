import React from 'react'
import { makeStyles,MenuItem,TextField,Button} from '@material-ui/core';
import {useField,useFormikContext,Field} from 'formik'


  

export function Input(props) {
    const {name,label,...rest}=props

    

    return (
        <div> 
             <Field id={name}  name={name} label={label} {...rest} />
        </div>
           
             
                 
    )
}


 export const TextfildWrapper=({name,...rest})=>{

  const [field,meta]=useField(name)

    const  textfildconfig= {
    ...field,
      ...rest,
      fullWidth: true,
      variant: 'outlined',
    }
    if(meta && meta.touched && meta.error){
      textfildconfig.error=true;
      textfildconfig.helperText=meta.error;
  
  
    }
       


    return (
        <TextField  {...textfildconfig}/>  
           
                
                 
                 
      
    )

}



export const  List=({name,options,...rest})=>{
const {setFieldValue}=useFormikContext()
const [field,meta]=useField(name)

  const handleChange = evt=>{
   
     const {value}=evt.target;
     console.log('select_v',value)
     setFieldValue(name,value)

  }
  const selectconfig={
    ...field,
    ...rest,
    fullWidth: true,
    variant: 'outlined',
    select:true,
    onchange:handleChange

  }
  if(meta && meta.touched && meta.error){
    selectconfig.error=true;
    selectconfig.helperText=meta.error;


  }
     
    return(
       <TextField {...selectconfig} >
         {options && options.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
       </TextField>
    )
    

}

export const ButtonWrapper=({
  children, ...rest
  })=>{
   const {submitForm}=useFormikContext();

   const  handleSubmit=()=>{
     submitForm()
   }
    const  configButton={
     ...rest,
        variant:'contained',
        color:'primary',
        fullWidth: true ,
       onclick:handleSubmit
    }
  return (
    <Button  {...configButton} >
      {children}
    </Button>
  )
}
