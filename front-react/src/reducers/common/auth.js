/**
 * Authentification Reducer
 */
import moment from 'moment';

const initialState = {
    isAuthenticated: false,
    loginTimestamp: {},
    // Session Timeout timer
    sessionTimeOutTimer: null,
    // Google Login
    googleId: null,
    tokenId: null,
    accessToken: null,
    tokenObj: {},
    profileObj: {},
    // Employees Find Active
    userInfo: {},
    // Security Consult Users
    profilesFaculties: {},
    // Access log
    accessLog: {},
};

/**
 * 
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
    case 'UPDATE_AUTH_DATA' : {
        return {...state, 
            isAuthenticated: true,
            loginTimestamp: moment().toDate(),
            sessionTimeOutTimer: moment().toDate(),
            googleId: action.payload.googleId,
            tokenId: action.payload.tokenId,
            accessToken: action.payload.accessToken,
            tokenObj: action.payload.tokenObj,
            profileObj: action.payload.profileObj,
        };
    }
    case 'UPDATE_SESSION_TIMER' : {
        return {...state, 
            sessionTimeOutTimer: action.payload,
        };
    }
    case 'UPDATE_USER_INFO' : {
        return {...state, 
            userInfo: action.payload,
        };
    }
    case 'UPDATE_USER_PROFILES_FACULTIES' : {
        return {...state, 
            profilesFaculties: action.payload,
        };
    }
    case 'UPDATE_USER_ACCESS_LOG' : {
        return {...state, 
            accessLog: action.payload,
        };
    }
    case 'RESET_AUTH_DATA' : {
        return {...state, 
            isAuthenticated: initialState.isAuthenticated,
            loginTimestamp: initialState.loginTimestamp,
            sessionTimeOutTimer: initialState.sessionTimeOutTimer,
            googleId: initialState.googleId,
            tokenId: initialState.tokenId,
            accessToken: initialState.accessToken,
            tokenObj: initialState.tokenObj,
            profileObj: initialState.profileObj,
            userInfo: initialState.userInfo,
            profilesFaculties: initialState.profilesFaculties,
            accessLog: initialState.accessLog
        };
    }
    }
    return state;        
}
