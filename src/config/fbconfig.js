import firebase from 'firebase/app'
import   'firebase/firestore'
import 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAIWuKkRQsqmeYMtEJnO7eU9BEjozRD-3o",
    authDomain: "mario-project-ac19e.firebaseapp.com",
    projectId: "mario-project-ac19e",
    storageBucket: "mario-project-ac19e.appspot.com",
    messagingSenderId: "503096394524",
    appId: "1:503096394524:web:50488fec077311904a30d9",
    measurementId: "G-NCS86QDVED"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
 // firebaseConfig.firestore();
 firebase.firestore().settings({timestampsInSnapshots:true})
 export const db1=firebase.firestore()
 
export default firebase
