const INITIAL_STATE = {
    reservation:[],
    error:null,
    addclinc:false,
};
 
  const clincReducer =(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CLINC':
            return {...state,reservation:action.snapshot,error:null}
            case 'NO_CLINC':
                return{...state ,error:action.err.message}
                case 'Addclinc':
                    return {...state,addclinc:!state.addclinc }
        default:
            return state
    }
}
export default clincReducer 