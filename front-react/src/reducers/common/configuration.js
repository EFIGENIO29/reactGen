/**
 * Configuration
 */
const initialState = {
    userCanSeeSIF: false,
    userCanSeeSIC: false,
    companySIF: null,
    companySIC: null,
    companyTemporalSIF: null,
    companyTemporalSIC: null,
    catalogModulo : null,
    catalogEstatus : null,
};
/**
 * 
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
    case 'UPDATE_CONFIGURATION_SHOW_SIF' : {
        return {...state, userCanSeeSIF: action.payload};
    }
    case 'UPDATE_CONFIGURATION_SIF' : {
        return {...state, companySIF: action.payload};
    }
    case 'UPDATE_CONFIGURATION_TEMPORAL_SIF' : {
        return {...state, companyTemporalSIF: action.payload};
    }
    case 'UPDATE_CONFIGURATION_SHOW_SIC' : {
        return {...state, userCanSeeSIC: action.payload};
    }
    case 'UPDATE_CONFIGURATION_SIC' : {
        return {...state, companySIC: action.payload};
    }
    case 'UPDATE_CONFIGURATION_TEMPORAL_SIC' : {
        return {...state, companyTemporalSIC: action.payload};
    }
    case 'RESET_CONFIGURATION' : {
        return {...state, 
            userCanSeeSIF: initialState.userCanSeeSIF,
            companySIF: initialState.companySIF,
            userCanSeeSIC: initialState.userCanSeeSIC,
            companySIC: initialState.companySIC
        };
    }
    case 'UPDATE_CATALOG_MODULO' : {
        return {...state, catalogModulo: action.payload};
    }
    case 'UPDATE_CATALOGO_ESTATUS' : {
        return {...state, catalogEstatus: action.payload};
    }
    case 'RESET_CATALOG' : {
        return {...state, 
            catalogModulo: initialState.catalogModulo,
            catalogEstatus: initialState.catalogEstatus
        };
    }

    }
    return state;        
}
