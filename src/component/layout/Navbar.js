import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLink from  './SinedInLink'
import SignedOutLink from './SignedOutLink'
import {connect}from 'react-redux'
function Navbar(props) {
    const {auth,profile}=props
   
    const link=auth.uid?  <SignedInLink  profile={profile}/> :  <SignedOutLink /> 
    return (    
    <nav className='nav-wrapper grey darken-3'>
        <div className='container'>
        <Link to='/' className='brand-logo'>Dr</Link>
        
         {link}
       
        </div>

    </nav>    
    )
}
const mapStateToprops=(state)=>{
    console.log('auth111',state)
    return{
       auth:state.firebase.auth,
       profile:state.firebase.profile
    }

}

export default connect(mapStateToprops)(Navbar)
