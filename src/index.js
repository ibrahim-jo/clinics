import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore,compose} from 'redux';
import rootreducer from '../src/store/reducers/rootReducer'
import  { Provider, useSelector}from 'react-redux'
import {getFirebase,ReactReduxFirebaseProvider,isLoaded, reactReduxFirebase} from 'react-redux-firebase'
import {getFirestore,reduxFirestore}from 'redux-firestore'
import thunk from 'redux-thunk' ;
import {createFirestoreInstance} from 'redux-firestore'
import firebase from '../src/config/fbconfig'
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


const store=createStore(rootreducer,
  compose( applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore}))))
  
const profileSpecificProps = {
  userProfile: 'user',
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};


const rrfprop={
  firebase,
  config:profileSpecificProps,
  dispatch:store.dispatch,
  createFirestoreInstance

} 
// for  wait  a firestore to send user data  use isload from react-redux-firebase
   const AuthIsLoadd=({children})=>{
     const auth= useSelector(state => state.firebase.auth)
     if(!isLoaded(auth)) return <div>Loding Screen...</div>
     return children

   }
////
ReactDOM.render(
  
  
    <ThemeProvider theme={theme} >
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfprop}>
        <AuthIsLoadd>
    <App />
    </AuthIsLoadd>
    </ReactReduxFirebaseProvider>
    </Provider>
    </ThemeProvider>
,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
