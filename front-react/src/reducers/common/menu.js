/**
 * 
 */

/**
 * 
 */
const initialState = {
    data: [],
    open: false,
    url: ""
};

/**
 * @desc Menu reducer
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'UPDATE_MENU_DATA' : {
            return {...state,
                data: action.payload,
            };
        }
        case 'UPDATE_MENU_OPEN' : {
            return {...state,
                open: action.payload,
            };
        }
        case 'RESET_MENU' : {
            return {...state,
                data: initialState.data,
                open: initialState.open
            };
        }
        case 'UPDATE_URL' : {
            return {...state,
                url: action.payload,
            };
        }
        case 'RESET_URL' : {
            return {...state,
                url: initialState.url,
            };
        }
    }
    return state;        
}
