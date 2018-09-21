/** Custom Constants */
import * as CommonConstants from 'constants/common';
/**
 * 
 */
const initialState = {
    backgroundColor: CommonConstants.COMMON_LAYOUT_HEADER_BACKGROUND_COLOR
};
/**
 * @desc Layout reducer
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
    case 'UPDATE_HEADER_BACKGROUND_COLOR' : {
        return {...state, 
            backgroundColor: action.payload,
        };
    }
    case 'RESET_HEADER_BACKGROUND_COLOR' : {
        return {...state, 
            backgroundColor: initialState.backgroundColor,
        };
    }
    }
    return state;
}
