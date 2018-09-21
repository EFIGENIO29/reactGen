const initialState = {
    data: [],
    catalogEmpresas: [],
    catalogSucursales: [],
    objeto: [],
    dataNew: [],
    index:null,
    userProfiles:[],
    userProfilesDND:[],
    userFacultiesDND:[],
    userPerfilesSucursales:[],
    userDTUserSucursales:[]
};

/**
 * @desc Leads reducer
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'CATEMPRESAS_DATA' : {
            return {...state,
                catalogEmpresas: action.payload
            };
        }
        case 'CATSUCURSALES_DATA' : {
            return {...state,
                catalogSucursales: action.payload
            };
        }
        case 'RESET_CATSUCURSALES_DATA' : {
            return {...state,
                catalogSucursales: []
            };
        }
        case 'USUARIOSCONSULTA_FILTRO' : {
            return {...state,
                data: action.payload
            };
        }
        case 'RESET_TABLE' : {
            return {...state,
                data: []
            };
        }
        case 'UPDATE_OBJETO' : {

            return {...state,
                objeto: action.payload,
            };
        }
        case 'RESET_OBJETO' : {

            return {...state,
                objeto: [],
            };
        }
        case 'UPDATE_TABLE' : {
            return {...state,
                data: action.payload,
            };
        }
        case 'TABLE_NEW' : {
            return {...state,
                dataNew: action.payload
            };
        }
        case 'RESET_TABLE_NEW' : {
            return {...state,
                dataNew: []
            };
        }
        case 'UPDATE_TABLE_NEW' : {
            return {...state,
                dataNew: action.payload
            };
        }
        case 'CHANGE_INDEX' : {
            return {...state, 
                index: action.payload,
            };
        }
        case 'RESET_PROFILE_FACULTYS_CONSULT' : {
            //debugger
            return {...state, 
                userProfiles:[]
            };
        }
        case 'UPDATE_PROFILE_FACULTYS_CONSULT' : {
            //debugger
            return {...state, 
                userProfiles: action.payload
            };
        } 
        case 'RESET_UPDATE_USER_PROFILES_CONSULT' : {
            //debugger
            return {...state, 
                userProfilesDND:[]
            };
        }
        case 'UPDATE_USER_PROFILES_CONSULT' : {
            //debugger
            return {...state, 
                userProfilesDND: action.payload
            };
        }   
        case 'RESET_USER_FACULTIES_CONSULT' : {
            //debugger
            return {...state, 
                userFacultiesDND:[]
            };
        }
        case 'UPDATE_USER_FACULTIES_CONSULT' : {
            //debugger
            return {...state, 
                userFacultiesDND: action.payload
            };
        }
        case 'RESET_USER_PROFILES_CONSULT_US' : {
            //debugger
            return {...state, 
                userPerfilesSucursales:[]
            };
        }
        case 'UPDATE_USER_PROFILES_CONSULT_US' : {
            //debugger
            return {...state, 
                userPerfilesSucursales: action.payload
            };
        }
        case 'RESET_USER_FACULTIES_CONSULT_US' : {
            //debugger
            return {...state, 
                userPerfilesSucursales:[]
            };
        }
        case 'UPDATE_USER_FACULTIES_CONSULT_US' : {
            //debugger
            return {...state, 
                userPerfilesSucursales: action.payload
            };
        }
        case 'RESET_UPDATE_USER_DTSUC' : {            
            return {...state, 
                userDTUserSucursales:[]
            };
        }
        case 'UPDATE_USER_DTSUC' : {            
            return {...state, 
                userDTUserSucursales: action.payload
            };
        }
        
        
        
        
         
        case 'RESET_PROFILES' : {
            return {...state,                 
                userProfiles: []
            };
        }
    }
    return state;
}