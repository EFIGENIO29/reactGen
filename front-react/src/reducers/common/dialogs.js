/**
 * Authentification
 */
import * as DialogsConstants from 'constants/dialogs';

const initialState = {
    // Error dialog properties
    loginErrorTitle: DialogsConstants.DIALOGS_LOGIN_ERROR_TITLE,
    loginErrorIcon: true,
    loginErrorText: null,
    loginErrorButtonText: null,
    loginErrorOpen: false,
    // User welcome open/close
    userWelcome: false,
    // Loading open/close
    loading: false,
    // Loading open/close
    sessionTimer: false,
    // Select company warning
    selectCompany: false,
    validationUP: false,
    validationUF: false,
    validationUS: false,
    validation: false,
    validationEdith: false,
    error: false,
    success: false,
    successTitle: '',
    errorTitle: '',
    successMsg: '',
    errorMsg: '',
    deleteAllOpen: false,
    openDialog:false,    
    bitacoraDialog:false,
    confirm: {
        "mostrar": false,
        "descripcion": "",
        "delete": false
    }
};
/**
 * 
 */
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'UPDATE_DIALOGS_LOGIN_ERROR_TITLE' : {
            return {...state, loginErrorTitle: action.payload};
        }
        case 'UPDATE_DIALOGS_LOGIN_ERROR_ICON' : {
            return {...state, loginErrorIcon: action.payload};
        }
        case 'UPDATE_DIALOGS_LOGIN_ERROR_TEXT' : {
            return {...state, loginErrorText: action.payload};
        }
        case 'UPDATE_DIALOGS_LOGIN_ERROR_BUTTON_TEXT' : {
            return {...state, loginErrorButtonText: action.payload};
        }
        case 'UPDATE_DIALOGS_LOGIN_ERROR_OPEN' : {
            return {...state, loginErrorOpen: action.payload};
        }
        case 'UPDATE_DIALOGS_USER_WELCOME_OPEN' : {
            return {...state, userWelcome: action.payload};
        }
        case 'UPDATE_DIALOGS_LOADING_OPEN' : {
            return {...state, loading: action.payload};
        }
        case 'UPDATE_DIALOGS_SESSION_TIMER_OPEN' : {
            return {...state, sessionTimer: action.payload};
        }
        case 'UPDATE_DIALOGS_SELECT_COMPANY_OPEN' : {
            return {...state, selectCompany: action.payload};
        }
        case 'UPDATE_PROGRESS_SUCCESS_OPEN' : {
            return {...state, openDialog: action.payload};
        }
        case 'RESET_DIALOGS' : {
            return {...state, 
                loginErrorTitle: initialState.loginErrorTitle,
                loginErrorIcon: initialState.loginErrorIcon,
                loginErrorText: initialState.loginErrorText,
                loginErrorButtonText: initialState.loginErrorButtonText,
                loginErrorOpen: initialState.loginErrorOpen,
                userWelcome: initialState.userWelcome,
                loading: initialState.loading,
                sessionTimer: initialState.sessionTimer,
                selectCompany: initialState.selectCompany, 
                validationUS:  initialState.validationUS, 
                validationUF:  initialState.validationUF, 
                validation:  initialState.validation, 
                validationEdith:  initialState.validationEdith, 
                error:  initialState.error, 
                success:  initialState.success, 
                successTitle:  initialState.successTitle, 
                errorTitle:  initialState.errorTitle, 
                successMsg:  initialState.successMsg, 
                errorMsg:  initialState.errorMsg, 
                deleteAllOpen:  initialState.deleteAllOpen, 
                openDialog: initialState.openDialog, 
                bitacoraDialog: initialState.bitacoraDialog,
                confirm: initialState.confirm


            };
        }
        case 'UPDATE_DIALOGS_VALIDATION_OPEN' : {
                return {...state, validation: action.payload};
        }
        case 'UPDATE_DIALOGS_VALIDATION_OPEN_EDITH' : {
                return {...state, validationEdith: action.payload};
        }
        case 'UPDATE_DIALOGS_SUCCESS_OPEN' : {
            return {...state, success: action.payload};
        }
        case 'UPDATE_DIALOGS_ERROR_TITLE' : {
            return {...state, errorTitle: action.payload};
        }
        case 'UPDATE_DIALOGS_ERROR_MSG_MODAL' : {
                    return {...state, errorMsgModal: action.payload};
        } 
        case 'UPDATE_DIALOGS_ERROR_OPEN' : {
            return {...state, error: action.payload};
        }
         case 'UPDATE_DIALOGS_ERROR_MSG' : {
            return {...state, errorMsg: action.payload};
        }
         case 'DIALOGS_CONFIRM' : {
            return {...state, confirm: action.payload};
        }
         case 'DELETE_DIALOGS_CONFIRM' : {
            return {...state, confirm: action.payload};
        }
        case 'RESET_DELETE_DIALOGS_CONFIRM' : {
            return {...state, confirm: action.payload};
        }
        case 'UPDATE_DIALOGS_VALIDATION_OPEN_UF' : {
            return {...state, validationUF: action.payload};
        }
        case 'RESET_DIALOGS_VALIDATION_OPEN_UF' : {
            return {...state, validationUF: action.payload};
        }
        case 'UPDATE_DIALOGS_VALIDATION_OPEN_US' : {
            return {...state, validationUS: action.payload};
        }
        case 'RESET_DIALOGS_VALIDATION_OPEN_US' : {
            return {...state, validationUS: action.payload};
        }
        case 'UPDATE_DIALOGS_VALIDATION_OPEN_UP' : {
            return {...state, validationUP: action.payload};
        }
        case 'RESET_DIALOGS_VALIDATION_OPEN_UP' : {
            return {...state, validationUP: action.payload};
        }
        
        
    }

    return state;        
}

