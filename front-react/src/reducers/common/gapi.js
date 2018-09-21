/**
 * Google API
 */
const initialState = {
    messagesUnread: 0
};

/**
 * 
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
    case 'UPDATE_GAPI_MESSAGES_UNREAD' : {
        return {...state, 
            messagesUnread: action.payload
        };
    }
    case 'RESET_GAPI_MESSAGES_UNREAD' : {
        return {...state, 
            messagesUnread: initialState.messagesUnread
        };
    }
    }
    return state;        
}
