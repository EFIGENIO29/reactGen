'use strict';
/** 
 * Network Error when using nock with axios #699
 * https://github.com/node-nock/nock/issues/699#issuecomment-272708264
 */
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'
const host = 'http://localhost';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
/** Endpoint URIs */
import * as EndpointsConstants from 'constants/endpoints';
/** JSON Base */
import JSON from 'api/seguridad-autorizacion-consultarMenus';
/** Request params && Configuration headers */
const params = {};
const config = {
    headers: {
        'content-type': 'application/json'
    }
};
/** Start tests */
describe('Login: Security > Authorization > Consult Menus', () => {
    test('Status === 200', (done) => {
        axios.post(EndpointsConstants.URI_MENU_CONSULT, params, config)
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            }).catch(done.fail);
    });
    test('successful == ' + JSON.successful, (done) => {
        axios.post(EndpointsConstants.URI_MENU_CONSULT, params, config)
            .then((response) => {
                expect(response.data.successful).toBe(JSON.successful);
                done();
            }).catch(done.fail);
    });
    test('functionalMessage == ' + JSON.functionalMessage, (done) => {
        axios.post(EndpointsConstants.URI_MENU_CONSULT, params, config)
            .then((response) => {
                expect(response.data.functionalMessage).toBe(JSON.functionalMessage);
                done();
            }).catch(done.fail);
    });
    test('technicalMessage == ' + JSON.technicalMessage, (done) => {
        axios.post(EndpointsConstants.URI_MENU_CONSULT, params, config)
            .then((response) => {
                expect(response.data.technicalMessage).toBe(JSON.technicalMessage);
                done();
            }).catch(done.fail);
    });
});
