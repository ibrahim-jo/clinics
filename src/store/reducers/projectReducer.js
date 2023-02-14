const INITIAL_STATE = {
    projects:[
        {id:'1',title:'hep me find',content:'blalalla'},
        {id:'2',title:' react redux is fu ',content:'bla cm md'},
        {id:'3',title:' me and asm ',content:'blam banad'}
    ]
};
 
const ProjectReducer= (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CREAT_PROJECT' :
            console.log('creaat project don',action.project)
            return state;
            case 'CREAT_PROJECT_ERR':
             console.timeLog('project error',action.err)
        return state ;
          case 'REMOVE_PRO': 
          return state ;
            case 'REMOVE_PRO_ERR':
              return state   ;
              case 'UPDATE_SUCCES':
                  return state;
                  case 'UPDATE_FAILD':
                      return  state;

        default:
            return state
    }
    
   
}
export default ProjectReducer