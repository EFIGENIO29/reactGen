/**
 * Gmail > API > Users.labels: get
 * https://developers.google.com/gmail/api/v1/reference/users/labels/get
 * 
 * OAuth 2.0 for Client-side Web Applications
 * https://developers.google.com/identity/protocols/OAuth2UserAgent
 */
import axios from 'axios';
import * as GapiConstants from 'constants/gapi';

/**
 * Exchange OAuth2 Token
 * @return {object} 
 */
function exchangeOAuth2Token(accessToken, dispatch) {    
    let url = GapiConstants.GAPI_OAUTH2_TOKENINFO;
    url += '?id_token=' + accessToken;
    debugger
    axios.post(url).then(
        (response) => {
            if ( response.status === 200 ) {
                getMessagesUnread(accessToken, dispatch);
            }
        },
        (error) => {
            dispatch({
                type: 'ERROR_GAPI_MESSAGES_UNREAD',
                payload: error
            });
        }
    );
}

/**
 * Get Messages Unread
 * @return {object} 
 */
function getMessagesUnread(accessToken, dispatch) {
    let url = GapiConstants.GAPI_GMAIL_LABELS_INBOX;
    url += '?access_token=' + accessToken;
    axios.get(url).then(
        (response) => {
            if ( response.status === 200 ) {
                dispatch({
                    type: 'UPDATE_GAPI_MESSAGES_UNREAD',
                    payload: response.data.messagesUnread
                });
            }
        },
        (error) => {
            dispatch({
                type: 'ERROR_GAPI_MESSAGES_UNREAD',
                payload: error
            });
        }
    );
}

/**
 * Update Messages Unread
 * @return {object} 
 */
export function updateMessagesUnread(accessToken) {
    return (dispatch) => {
        //exchangeOAuth2Token(accessToken, dispatch);
    };
}

/**
 * Reset Messages Unread
 * @return {object} 
 */
export function resetMessagesUnread() {
    return (dispatch) => {
        dispatch({
            type: 'RESET_GAPI_MESSAGES_UNREAD'
        });
    };
}

/**
 * Logout from the login Account
 * @param {string} access_token
 * @return {object} 
 */
export function googleLogOutAccount(access_token) {
    if ( process.env.NODE_ENV !== 'development' ) {
        //window.open(GapiConstants.GAPI_ACCOUNT_LOGOUT, '_blank');
    }
}
