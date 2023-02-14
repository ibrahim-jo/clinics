export const  signin=(credintals)=>{

    return(dispatch,getState,{getFirebase})=>{

        const firebase=getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credintals.email,
            credintals.password
        ).then(()=>{
            dispatch({type:'LOGIN_SUCCESS'})
        }).catch((err)=>{
            dispatch({type:'LOGIN_ERROR',err})
        })


    }

}

export const signout=()=>{
    return (dispatch,getstate,{getFirebase})=>{
        const firebase=getFirebase();

       firebase.auth().signOut().then(dispatch({type:'SIGNOUT_SUCCESS'}),console.log('signout'))
       .catch((err)=>{
           console.log('errorsignout',err)
})
     

    }
}

 export const signUp=(newUser)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        const firestore=getFirebase().firestore()
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
         ).then(res=>{
             return firestore.collection('user').doc(res.user.uid).set({
                 lastName:newUser.last,
                 firstName:newUser.first,
                 type:'',
                  Id:res.user.uid,
                  clinc:newUser.clinc
            
             })

         }).then(()=>{
             dispatch({type:'SIGNUP_SUCSESS'})
         }).catch(err=>{
             dispatch({type:'SIGNUP_ERROR',err})
         })

    }
}

