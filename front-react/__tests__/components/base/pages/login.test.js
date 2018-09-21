'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';

import { requireAuthentication } from 'containers/AuthenticatedComponent';
/** Home Page Components */
import { Login } from 'components/base/pages';
import store from 'store';

/** Start tests */
describe('Components: Base > Pages > Login', () => {
    test('renders the title', () => {
        const wrapper = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(wrapper.text()).to.contain('Inicio de sesión');
    });
    test('renders an `.wrapLogin`', () => {
        const wrapper = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(wrapper.find('.wrapLogin')).to.have.length(1);
    });
    test('should render', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(wrapper.contains(<div className="wrapLogin" />)).to.equal(false);
    });
});
