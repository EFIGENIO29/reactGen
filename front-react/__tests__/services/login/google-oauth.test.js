'use strict';

import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'
const host = 'http://localhost';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
/** Endpoint URIs */
import * as GapiConstants from 'constants/gapi';
/** Request params && Configuration headers */
const params = {
    'action': 'listSessions',
    'scope': 'openid profile email',
    'client_id': GapiConstants.GAPI_CLIENT_ID,
    'ss_domain': 'http://localhost:3333',
    'origin': 'http://localhost:3333'
};
const config = {
    headers: {
        'Referer': 'https://accounts.google.com/o/oauth2/iframe'
    }
};
/** Start tests */
describe('Login: Google OAuth', () => {
    test('IFrame > Status === 200', (done) => {
        axios.get(GapiConstants.GAPI_OAUTH2_IFRAME, {}, {})
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            }).catch(done.fail);
    });
});
