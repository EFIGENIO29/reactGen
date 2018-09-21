/**
 * Authentification
 */
import * as DialogsConstants from 'constants/dialogs';

const initialState = {
    // Error dialog properties
    filterList: []
};
/**
 * 
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'UPDATE_DND_FILTER' : {
            return {...state, 
                filterList: action.payload
            };
        } 
        case 'RESET_STATE_DND_FILTER' : {
            return {...state, 
                filterList: initialState.filterList
            };
        }       
    }

    return state;        
}

