/**
 * @function Update Login error Text
 * @param string text
 * @return {object} 
 */
export function updateLoginErrorText(text) {
    return {
        type: 'UPDATE_DIALOGS_LOGIN_ERROR_TEXT',
        payload: text
    };
}
/**
 * @function Update Login error Open
 * @param boolean open
 * @return {object} 
 */
export function updateLoginErrorOpen(open) {
    return {
        type: 'UPDATE_DIALOGS_LOGIN_ERROR_OPEN',
        payload: open
    };
}
/**
 * @function Update User Welcome Open
 * @param boolean open
 * @return {object} 
 */
export function updateUserWelcomeOpen(open) {
    return {
        type: 'UPDATE_DIALOGS_USER_WELCOME_OPEN',
        payload: open
    };
}
/**
 * @function Update Loading Open
 * @param boolean open
 * @return {object} 
 */
export function updateLoadingOpen(open) {
    return {
        type: 'UPDATE_DIALOGS_LOADING_OPEN',
        payload: open
    };
}
/**
 * @function Update Session Timer Open
 * @param boolean open
 * @return {object} 
 */
export function updateSessionTimerOpen(open) {
    return {
        type: 'UPDATE_DIALOGS_SESSION_TIMER_OPEN',
        payload: open
    };
}
/**
 * @function Update Select Company Alert
 * @param boolean open
 * @return {object} 
 */
export function updateSelectCompanyOpen(open) {
    return {
        type: 'UPDATE_DIALOGS_SELECT_COMPANY_OPEN',
        payload: open
    };
}
/**
 * @function 
 * @return {object} 
 */
export function resetState() {
    return {
        type: 'RESET_DIALOGS'
    };
}
/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
 export function updateValidationOpen(open) {
    return {
        //console.log("EJECUTADO en la funcion");
        type: 'UPDATE_DIALOGS_VALIDATION_OPEN',
        payload: open
    };
}
/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
export function updateValidationOpenUF(open) {
    return {
        //console.log("EJECUTADO en la funcion");
        type: 'UPDATE_DIALOGS_VALIDATION_OPEN_UF',
        payload: open
    };
}
/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
export function updateValidationOpenUP(open) {
    return {
        //console.log("EJECUTADO en la funcion");
        type: 'UPDATE_DIALOGS_VALIDATION_OPEN_UP',
        payload: open
    };
}
/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
export function resetValidationOpenUP(open) {
    return {
        //console.log("EJECUTADO en la funcion");
        type: 'RESET_DIALOGS_VALIDATION_OPEN_UP',
        payload: open
    };
}
/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
export function resetValidationOpenUF(open) {
    return {
        //console.log("EJECUTADO en la funcion");
        type: 'RESET_DIALOGS_VALIDATION_OPEN_UF',
        payload: open
    };
}
/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
export function updateValidationOpenUS(open) {    
    return {        
        type: 'UPDATE_DIALOGS_VALIDATION_OPEN_US',
        payload: open
    };
}
/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
export function resetValidationOpenUS(open) {
    return {
        //console.log("EJECUTADO en la funcion");
        type: 'RESET_DIALOGS_VALIDATION_OPEN_US',
        payload: open
    };
}

/**
 * @function Update Validation Open
 * @param boolean open
 * @return {object} 
 */
 export function updateValidationOpenEdith(open) {
    return {
        //console.log("EJECUTADO en la funcion");
        type: 'UPDATE_DIALOGS_VALIDATION_OPEN_EDITH',
        payload: open
    };
}
/**
 * @function Confirm Delete Open
 * @param boolean open
 * @return {object}
 */
 export function confirmEstatusView(data) {
    return {
        type: 'DIALOGS_CONFIRM',
        payload: data
    };
}
 export function resetDelete(data) {
    return {
        type: 'RESET_DELETE_DIALOGS_CONFIRM',
        payload: data
    };
}
 export function confirmEstatus(data) {
    return {
        type: 'DELETE_DIALOGS_CONFIRM',
        payload: data
    };
}

/**
 * @function Update Success Open
 * @param boolean open
 * @return {object} 
 */
 export function updateSuccessOpen(open) {
    return {
        type: 'UPDATE_DIALOGS_SUCCESS_OPEN',
        payload: open
    };
}
export function updateDialogProgressOpen(open) {
    return {
        type: 'UPDATE_PROGRESS_SUCCESS_OPEN',
        payload: open
    };
}
/**
 * @function Update Success Title
 * @param boolean open
 * @return {object} 
 */
 export function updateSuccessTitle(title) {
    return {
        type: 'UPDATE_DIALOGS_SUCCESS_TITLE',
        payload: title
    };
}
/**
 * @function Update Success Msg
 * @param boolean open
 * @return {object} 
 */
 export function updateSuccessMsg(msg) {
    return {
        type: 'UPDATE_DIALOGS_SUCCESS_MSG',
        payload: msg
    };
}
 export function updateErrorTitle(title) {
    return {
        type: 'UPDATE_DIALOGS_ERROR_TITLE',
        payload: title
    };
}
/**
 * @function Update Error Msg
 * @param boolean open
 * @return {object} 
 */
 export function updateErrorMsg(msg) {
    return {
        type: 'UPDATE_DIALOGS_ERROR_MSG',
        payload: msg
    };
}
export function updateErrorMsgModal(msg) {
    return {
        type: 'UPDATE_DIALOGS_ERROR_MSG_MODAL',
        payload: msg
    };
}
 export function updateErrorOpen(open) {
    return {
        type: 'UPDATE_DIALOGS_ERROR_OPEN',
        payload: open
    };
}