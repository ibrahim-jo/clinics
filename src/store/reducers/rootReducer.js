import authReducer from './authReducer'
import ProjectReducer from './projectReducer'
import clincReducer from './clincReducer'
import drresvReducer from './drresvReducer'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import {combineReducers} from 'redux'

const rootreducer=combineReducers({
    auth:authReducer,
    reserv:clincReducer,
    project:ProjectReducer,
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    drresvReducer:drresvReducer
})
export default rootreducer ;