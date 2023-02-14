import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signin} from '../../store/actions/authAction'
import {Redirect}from 'react-router-dom'
 class SignIn extends Component {
    
constructor(props){
    super(props);
    this.state={
        email:'',
        password:''
    }
}
 handleSubmit=(e)=>{
 e.preventDefault();
 //console.log(this.state);
   const {signin}=this.props
   signin(this.state)
}
handleChange=(e)=>{
   this.setState({[e.target.id]:e.target.value})
}

    render() {
        console.log('signIn____________')
        const {authError,auth}=this.props
        if(auth.uid) return <Redirect to='/' />

        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} className='white'>
                    <h5 className='grey-text text-darken-3'>Sign In</h5>
                    <div className='input-field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' onChange={this.handleChange}></input>
                    </div>
                    <div className='input-field'>
                        <label htmlFor='password'>Password</label>
                        <input type='password'id='password' onChange={this.handleChange}></input>
                    </div>
                    <div className='input-field'>
                    <button className='btn green lighten-1 z-depth-0' onSubmit={this.handleSubmit}>LogIn</button>
                    <div className='red-text center'>
                        {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
                
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
   return {
       authError:state.auth.authError,
       auth:state.firebase.auth
   }
}

const mapDispatchToprops=(dispatch)=>{
    return{
    signin:(cred)=> dispatch(signin(cred))
    }
}
export default connect(mapStateToProps,mapDispatchToprops) (SignIn)
