let GAPI_API_KEY = '';
let GAPI_CLIENT_ID = '';
let GAPI_OAUTH2_IFRAME = 'https://accounts.google.com/o/oauth2/iframe';
let GAPI_OAUTH2_IFRAMERPC = 'https://accounts.google.com/o/oauth2/iframerpc';
let GAPI_OAUTH2_REVOKE = 'https://accounts.google.com/o/oauth2/revoke';
let GAPI_OAUTH2_TOKENINFO = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
let GAPI_GMAIL_LABELS_INBOX = 'https://www.googleapis.com/gmail/v1/users/me/labels/INBOX';
let GAPI_UPDATE_MESSAGES_UNREAD = 600;
let GAPI_ACCOUNT_LOGOUT = 'https://accounts.google.com/logout';
// Only the development enviroment
switch(process.env.NODE_ENV) {
    case 'production':
    case 'testing':
        GAPI_API_KEY = 'AIzaSyDkzGvltR6UGCOFCrdFcHCcqs4FNcOCCGk';
        GAPI_CLIENT_ID = '690992039442-7i1abco1ppl0t2b2qa40dc3c5nfe2m9e.apps.googleusercontent.com';
    break;
    case 'development':
        GAPI_API_KEY = 'AIzaSyDkzGvltR6UGCOFCrdFcHCcqs4FNcOCCGk'; 
        GAPI_CLIENT_ID = '690992039442-7i1abco1ppl0t2b2qa40dc3c5nfe2m9e.apps.googleusercontent.com';
    break;
}
/** Google App API Key */
export {GAPI_API_KEY};
/** Google App URL */
export {GAPI_CLIENT_ID};
/** Google OAuth 2: IFrame RPC */
export {GAPI_OAUTH2_IFRAME};
export {GAPI_OAUTH2_IFRAMERPC};
/** Google OAuth 2: Revoke */
export {GAPI_OAUTH2_REVOKE};
/** Google OAuth 2: Token Info URL */
export {GAPI_OAUTH2_TOKENINFO};
/** Google Gmail API URL */
export {GAPI_GMAIL_LABELS_INBOX};
/** Time in seconds to check the Messages Unread */
export {GAPI_UPDATE_MESSAGES_UNREAD};
/** Account Logout Link  */
export {GAPI_ACCOUNT_LOGOUT};
