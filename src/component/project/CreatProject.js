
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectActions'
import {Redirect} from 'react-router-dom'
class CreateProject extends Component {
constructor(props){
   super(props);
   this.state={
       name:'',
       sex:'',
       idn:'',
       bairth:'',
       mobile:''

   }
  
}


handleSubmit=(e)=>{
e.preventDefault();
//console.log(this.state);
this.props.createProject(this.state);
this.props.history.push('/')
}
handleChange=(e)=>{
  this.setState({[e.target.id]:e.target.value})
}

   render() {
    const {auth}=this.props
       if(!auth.uid)return <Redirect to='/signin' />
       return (
           <div className='container'>
               <form onSubmit={this.handleSubmit} className='white'>
                   <h5 className='grey-text text-darken-3'>Create Patient</h5>
                   <div className='input-field'>
                       <label htmlFor='name'>Name</label>
                       <input type='text' id='name' onChange={this.handleChange}></input>
                   </div>
                   <div className='input-field'>
                       <label htmlFor='sex'>sex</label>
                       <textarea type='text'id='sex' className='materialize-textarea' onChange={this.handleChange}></textarea>
                   </div>
                   <div className='input-field'>
                       <label htmlFor='id'>ID</label>
                       <textarea type='text'id='idn' className='materialize-textarea' onChange={this.handleChange}></textarea>
                   </div>
                   <div className='input-field'>
                       <label htmlFor='bairth'>Bairth</label>
                       <input type='date'id='bairth' className='materialize-textarea' onChange={this.handleChange}></input>
                   </div>
                   <div className='input-field'>
                       <label htmlFor='mobile'>mobile</label>
                       <input type='tel'id='mobile' className='materialize-textarea' onChange={this.handleChange}></input>
                   </div>
                   <button className='btn green lighten-1 z-depth-0' onSubmit={this.handleSubmit}>Create</button>

               </form>
             
  
           </div>
       )
   }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
       createProject:(project)=>dispatch(createProject(project))

       }
    }

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject)
