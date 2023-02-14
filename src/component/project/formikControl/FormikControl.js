import React from 'react'
import {Input,TextfildWrapper,ButtonWrapper} from './InputControl'
function FormikControl(props) {
    const {control,...rest}=props
    
    switch (control) {
        case 'input':
            return <Input {...rest} />
            case 'textfield':
                return <TextfildWrapper {...rest}/>
                case 'Button':
                    return<ButtonWrapper {...rest}/>
            break;
    
        default:
            return null
    }
}


export default FormikControl
