const initialState = {
  data: [],  
  objeto: [],  
  index:null,
  filtro:{}
};

/**
 * @desc Leads reducer
 */
 export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'PERFILESCONSULTA_REGISTER' : {
            return {...state, 
                data: action.payload
                
            };
        }  
        case 'RESET_LEADS_STATE_REGISTER' : {
            return {...state, 
                data: [],  
                objeto: [],
                index:null,
                filtro:{}
            };
        }
        case 'RESET_ELEMENTS_STATE_REGISTER' : {
            return {...state,                 
                objeto: [],                
                index:null
            };
        }
        case 'CHANGE_INDEX_REGISTER' : {
            return {...state, 
                index: action.payload,
            };
        }
        case 'UPDATE_OBJETO_REGISTER' : {
            return {...state, 
                objeto: action.payload,
            };
        }      
        
        case 'RESET_DIALOGS_STATE_FILTRO_REGISTER' : {
            return {...state, 
                filtro:{},
            };
        }
         
    }
    return state;        
}
