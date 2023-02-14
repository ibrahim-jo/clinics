const INITIAL_STATE = {
   authError:null
};
 
const authReducer= (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         console.log('successssss')
         return{
            ...state,
               authError:null
         }
         case 'LOGIN_ERROR':
            console.log('erorrrrrr')
            return{
               ...state,
               authError:'faild login'
            }
            case 'SIGNOUT_SUCCESS':
               console.log('Signouttttt',state)
               return {
                  ...state
               }
               case 'SIGNUP_SUCSESS':
                  console.log('signup_success')
                  return{
                      ...state,authError:null
                  }
                  case 'SIGNUP_ERROR':
                     return{
                        ...state,authError:action.err.message
                     }
         default:
            return state ;
   }
  
}
export default authReducer;