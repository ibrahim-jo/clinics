const functions = require('firebase-functions');
const admin =require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Mario!");
 });

  const creatNotification=(notification=>{
      return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc=>{
          console.log( "add new NOTF", doc)
      })
  })

 exports.projectCreated=functions.firestore.document('/projects/{projectId}')
 .onCreate(doc=>{
     const project=doc.data()
     const notification={
         contant: 'Add new project',
         user:`${project.authorFirstName}${project.authorLastName}`,
         time :admin.firestore.FieldValue.serverTimestamp()
     }
     return creatNotification(notification)
 })

 exports.joindUser=functions.auth.user()
 .onCreate(user=>{
     return admin.firestore().collection('user')
     .doc(user.uid).get().then(doc=>{
         const newuser=doc.data()
         const notification={
             content:'joind the party',
             user:`${newuser.firstName}${newuser.lastName}`,
             time : admin.firestore.FieldValue.serverTimestamp()
         }
         return creatNotification(notification);

     })
 })
