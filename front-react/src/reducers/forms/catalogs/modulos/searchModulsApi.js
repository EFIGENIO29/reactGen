const initialState = {
    data: [],
    catalogos: [],
    objeto: [],
    dataNew: []
};

/**
 * @desc Leads reducer
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'CATMODULOS_DATA' : {
            return {...state,
                catalogos: action.payload
            };
        }
        case 'MODULOSCONSULTA_FILTRO' : {
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
                objeto: []
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
    }
    return state;
}