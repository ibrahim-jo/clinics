import React, { Component } from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Nav from './component/layout/Navbar'
import Dashbord from './component/dashbord/Dashbord'
import DetailsProject from './component/project/DetailsProject'
import SignIn from './component/auth/SignIn'
import SignUp2 from './component/auth/SignUp'
import CreateProject from './component/project/CreatProject'
//import  Topdf from './component/project/Topdf'
import  Print  from './component/project/report/Print'
import  Toreport1 from './component/project/report/Toreport1'
import permition from './component/permition/Permision'
import Reserv from './component/project/reserv'
function App() {
  return (
   
    <div className="App">
       <BrowserRouter>
     <Nav />
      <Switch>
        <Route exact path='/' component={Dashbord} />
        <Route   path='/project/:id'  component={DetailsProject}/>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp2} />
        <Route path='/create' component={CreateProject} />
        <Route path='/print/:id' component={Print} />
        <Route path='/Toreport1/:id' component={Toreport1} />
        <Route path='/permison' component={permition} />
        <Route path='/reserv/:id' component={Reserv} />
      </Switch>
   
     </BrowserRouter>
    </div>
  );
}

export default App;
