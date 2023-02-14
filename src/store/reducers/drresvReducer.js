const INITIAL_STATE = {};
 
const drresvReducer= (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SERV':
            //console.log('DRRES',action.baylood)
            return {...state,state:action.baylood}
        default:
            return state
    }
}

export default drresvReducer