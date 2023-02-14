import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signout} from '../../store/actions/authAction'
function SinedInLink(props) {
     const {type}= props.profile
           console.log('index user',props)

    return (
        <ul className='right'>
            <li><NavLink to='/create'>New Project</NavLink></li>
            <li><a  onClick={props.signout}>LogOut</a></li> 
           { type && type==='admin' ? <li><NavLink to='/permison' > Permistion </NavLink> </li> :null}
            <li><NavLink to='/' className='btn btn-floating green lighten-1'>{props.profile.lastName}</NavLink></li>
        </ul>
    )
}
const mapDispatchToProps=(dispatch)=>{
    return{
        signout:()=>dispatch(signout())
    }
}

export default connect(null,mapDispatchToProps)(SinedInLink)
