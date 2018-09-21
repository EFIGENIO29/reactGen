/**
 * IFrame
 */
const initialState = {
    gapIsLoaded: false,
    sicIsLoaded: false,
    menuKey: null,
    sifIsLoaded: false,
    buroIsLoaded: false,
    uri: null,
};
/**
 * 
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
    case 'UPDATE_LEGACYSYSTEMS_IFRAME_URI' : {
        return {...state, 
            uri: action.payload
        };
    }
    case 'RESET_LEGACYSYSTEMS_IFRAME_URI' : {
        return {...state, 
            uri: initialState.uri
        };
    }
    case 'UPDATE_LEGACYSYSTEMS_GAP_LOADED' : {
        return {...state, 
            gapIsLoaded: action.payload
        };
    }
    case 'UPDATE_LEGACYSYSTEMS_BURO_LOADED' : {
        return {...state, 
            buroIsLoaded: action.payload
        };
    }
    case 'UPDATE_LEGACYSYSTEMS_SIC_LOADED' : {
        return {...state, 
            sicIsLoaded: action.payload
        };
    }
    case 'UPDATE_LEGACYSYSTEMS_MENU_KEY' : {
        return {...state, 
            menuKey: action.payload
        };
    }
    case 'UPDATE_LEGACYSYSTEMS_SIF_LOADED' : {
        return {...state, 
            sifIsLoaded: action.payload
        };
    }
    case 'ERROR_LEGACYSYSTEMS_IFRAME_URI' : {
        return {...state, 
            uri: action.payload
        };
    }
    case 'RESET_LEGACYSYSTEMS_IFRAME_URI' : {
        return {...state, 
            uri: initialState.uri,
        };
    }
    case 'RESET_LEGACYSYSTEMS_GAP_LOADED' : {
        return {...state, 
            gapIsLoaded: initialState.gapIsLoaded,
        };
    }
    case 'RESET_LEGACYSYSTEMS_BURO_LOADED' : {
        return {...state, 
            gapIsLoaded: initialState.gapIsLoaded,
        };
    }
    case 'RESET_LEGACYSYSTEMS_SIC_LOADED' : {
        return {...state, 
            sicIsLoaded: initialState.sicIsLoaded,
        };
    }
    case 'RESET_LEGACYSYSTEMS_SIF_LOADED' : {
        return {...state, 
            sifIsLoaded: initialState.sifIsLoaded,
        };
    }
    case 'RESET_LEGACYSYSTEMS' : {
        return {...state, 
            uri: initialState.uri,
            gapIsLoaded: initialState.gapIsLoaded,
            buroIsLoaded: initialState.buroIsLoaded,
            sicIsLoaded: initialState.sicIsLoaded,
            sicMenuKey: initialState.sicIsLoaded,
            sifIsLoaded: initialState.sifIsLoaded,
        };
    }
    }
    return state;        
}
