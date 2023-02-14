import { isEmpty } from 'react-redux-firebase';
import  {db1} from '../../config/fbconfig'
//import { query, collection, where, getDocs } from "firebase/firestore";
export  const createProject=(project)=>{
    return(dispatch,getState,{ getFirebase })=>{
      
        const firestore=getFirebase().firestore();
        const profile=getState().firebase.profile
        const uid=getState().firebase.auth.uid
       firestore.collection('projects').add({
           ...project,
           authorFirstName:profile.firstName,
           authorLastName:profile.lastName,
           authorId:uid,
           createdAt:new Date()
       }).then(()=>{
        dispatch({type:'CREAT_PROJECT',project})

       })
       .catch((err)=>{
        dispatch({type:'CREAT_PROJECT_ERR',err})

       })

    }
}

export const removeProject=(id)=>{
    return( dispatch ,getState,{getFirebase})=>{
        const firestore=getFirebase().firestore() ;
        firestore.collection('projects').doc(id).delete()
        .then(()=>{
            dispatch({type:'REMOVE_PRO'})
        })
        .catch((err)=>{
            dispatch({type:'REMOVE_PRO_ERR',err})
        })
    }

}
export const Updateproject=(values)=>{
    console.log(values)
    return (dispatch,getState,{getFirebase})=>{
    const firestore=getFirebase().firestore();
   firestore.collection('projects').doc(values.id)
   .update({title:values.title,
    content:values.content

   }).then(()=>{
        dispatch({type:'UPDATE_SUCCES'})

   }).catch((err)=>{

     dispatch({type:'UPDATE_FAILD',err})


   })

   }

}
export const snapdata=async(time,id)=>{  
      const dbprojects=db1.collection('projects')
 if(time ){
  const q= dbprojects.where('createdAt','>=',time)
  
  // const snap= await  db1.collection('projects').where('createdAt','>=',time).get()
    const snap= await q.get()
      return snap.docs.map(doc=>doc)
 }
 
 else if(id ){
  const q=dbprojects.where('idn','==',id)
    const snap= await q.get()
  return snap.docs.map(doc=>doc)

 }
 else{
  const snap = await dbprojects.get()

  return snap.docs.map(doc=>doc)
 }

      
}

export  const  clincOfId =  (id)=>{
      
  return  ( async (dispatch,getState,{getFirebase})=>{
        console.log(id)
      const db=getFirebase().firestore();
     const snapshot= await db.collectionGroup('clinc').where('person','==',id).get()

       return snapshot.docs.map(doc => doc)

//return  dispatch({type:'SERV',baylood:clinarry})

 } )

}

export const creatClinc=(clinc)=>{
  return(dispatch,getState,{getFirebase})=>{
        const firestore=getFirebase().firestore();
       firestore.collection('projects').doc(clinc.person).collection('clinc').add({...clinc})
      .then(()=>{
           console.log('clinc success')
            dispatch({type:'Addclinc'})  
            window.location.href=`/project/${clinc.person}`
       })
      .catch((err)=>{
         console.log(err)
      })
   }

}


export const  snapclinc= (id)=>{
   
  //   console.log('details_id',id)
   
  return  ((dispatch,getState,{getFirebase})=>{
    
        const db=getFirebase().firestore();
        const  clinarry=[]
       
       
       db.collectionGroup('clinc').where('person','==',id).onSnapshot(snapshot=>{
        
             snapshot.docs.forEach(doc=>{
               clinarry.push(doc.data())
           })
             
      }
     )

     return   clinarry

  })
}

export  const  reservcl =  (namecl)=>{
  
     return  ( async (dispatch,getState,{getFirebase})=>{
           console.log(namecl)
         const db=getFirebase().firestore();
        const snapshot= await db.collectionGroup('clinc').where('name','==',namecl).get()

          return snapshot.docs.map(doc => doc);

 //return  dispatch({type:'SERV',baylood:clinarry})

    } )

}
export const  pationt=(id)=>{
      console.log('pationbb',id)
  return(async (dispatch,getState,{getFirebase})=>{
   const db=getFirebase().firestore();
    const snapshot= await db.collection('projects').doc(id).get()

    return snapshot.data()


  })

}
  export const updateresip=(val,val1)=>{
    console.log(val1,val[2])
     return(async(dispatch,getState,{getFirebase})=>{
       const db=getFirebase().firestore();
       await  db.collection('projects').doc(val[1]).collection('clinc').doc(val[0])
      .update({resip:val1,done:!val[2]}).then(()=>{
        console.log('sucsses')
      }).catch((err)=>{
        console.log(err);
      })
      
     
})
}

export const newclinc=(newcl)=>{
  console.log(newcl)
  return (async(dispatch,getState,{getFirebase})=>{
    const db=getFirebase().firestore();
     await db.collection('nclinc').doc().set(newcl)

  })

}
export  const newclic_R=()=>{

return(async(dispatch,getState,{getFirebase})=>{

    const db=getFirebase().firestore();
    const snapshot= await db.collection('nclinc').get()

       return   snapshot.docs.map(doc=>doc.data())    
    
})
}