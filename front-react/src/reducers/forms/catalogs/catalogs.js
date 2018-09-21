/**
 * 
 */
const initialState = {
    perfiles: [],
    facultadesLista: [],
    facultades: [],
    usarioPerfiles:[]
};

/**
 * @desc Menu reducer
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'UPDATE_CATALOGS_PERFILES' : {
            return {...state, 
                perfiles: action.payload
            };
        }
        case 'UPDATE_CATALOGS_FACULTADES' : {
            return {...state,                 
                facultades: action.payload,
                facultadesLista: action.payload
            };
        }
        case 'UPDATE_CATALOGS_FACULTADES_FILTRO' : {
            return {...state,                 
                facultadesLista: action.payload
            };
        }
        
        case 'RESET_CATALOGS_STATE' : {
            return {...state, 
                //perfiles: initialState.perfiles,
                facultades: initialState.facultades,
                facultadesLista: initialState.facultadesLista
            };
        }
        case 'RESET_CATALOGS_STATE_PROFILES' : {
            return {...state, 
                perfiles: initialState.perfiles
            };
        }
        case 'RESET_CATALOGS_STATE_FACULTIES' : {
            return {...state,                 
                facultades: initialState.facultades,
                facultadesLista: initialState.facultadesLista
            };
        }

        case 'RESET_CATALOGS_STATE_FILTER' : {
            return {...state, 
                facultadesLista: []
            };
        }
        case 'RESET_CATALOGS_USER_PROFILES' : {
            return {...state, 
                usarioPerfiles: []
            };
        }
        case 'UPDATE_CATALOGS_USER_PROFILES' : {
            return {...state, 
                usarioPerfiles: action.payload
            };
        }
        
    }
    return state;        
}
