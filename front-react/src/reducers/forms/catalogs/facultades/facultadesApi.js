const initialState = {
    data: [],
    catalogos: [],
    objeto: [],
    dataNew: [],
    dataCP: [],
    dataLTWO: [],
    dataLTREE: [],
    arbolMenu: {}

};

/**
 * @desc Leads reducer
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'CATFACULTADES_DATA' : {
            return {...state,
                catalogos: action.payload
            };
        }
        case 'FACULTADESCONSULTA_FILTRO' : {
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
        case 'CAT_PRINCIPAL' : {
            return {...state,
                dataCP: action.payload
            };
        }
        case 'CAT_LEVELTWO' : {

            return {...state,
                dataLTWO: action.payload
            };
        }
        case 'CAT_LEVELTREE' : {

            return {...state,
                dataLTREE: action.payload
            };
        }
        case 'ARBOL_MENU' : {
            return {...state,
                arbolMenu: action.payload
            };
        }
        case 'RESET_ARBOL_MENU' : {
            return {...state,
                arbolMenu: {}
            };
        }
    }
    return state;
}