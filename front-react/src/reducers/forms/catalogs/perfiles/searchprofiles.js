const initialState = {
  data: [],  
  objeto: [],  
  index:null,
  filtro:[],
  profileFaculties:[],
  dnd1:[],
  dnd2:[]
};

/**
 * @desc Leads reducer
 */
 export default function reducer(state=initialState, action) {     
    switch(action.type) {        
        case 'PERFILESCONSULTA_DATA' : {
            return {...state, 
                data: action.payload
            };
        }
        case 'PERFILESCONSULTA_FILTRO' : {
            return {...state, 
                data: action.payload
            };
        }  
        
        case 'RESET_LEADS_STATE' : {
            return {...state, 
                data: [],  
                objeto: [],                
                index:null,
                filtro:[]
            };
        }
        case 'RESET_ELEMENTS_STATE' : {
            return {...state,                 
                objeto: []//,                
                //index:null
            };
        }
        case 'CHANGE_INDEX' : {
            return {...state, 
            index: action.payload,
            };
        }
        case 'UPDATE_OBJETO' : {
            return {...state, 
            objeto: action.payload,
            };
        }      
        
        case 'RESET_DIALOGS_STATE_FILTRO' : {
            return {...state, 
                filtro:{},
            };
        }
        case 'RESET_PROFILE_FACULTYS_CONSULT' : {
            //debugger
            return {...state, 
                profileFaculties:[]
            };
        }
        case 'UPDATE_PROFILE_FACULTYS_CONSULT' : {
            //debugger
            return {...state, 
                profileFaculties: action.payload
            };
        }        
        case 'DND_PROFILES' : {
            return {...state, 
                dnd1: action.payload[0],
                dnd2: action.payload[1]
            };
        }
        case 'RESET_PROFILES' : {
            return {...state, 
                dnd1: [],
                dnd2: [],
                profileFaculties: []

            };
        }
        
        
         
    }
    return state;        
}
