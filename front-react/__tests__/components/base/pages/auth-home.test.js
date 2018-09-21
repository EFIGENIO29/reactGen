'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';

import { requireAuthentication } from 'containers/AuthenticatedComponent';
/** Home Page Components */
import { Home } from 'components/base/pages';
import store from 'store';

/** Start tests */
describe('Auth Components: Base > Pages > Home', () => {
    test('do not renders the title', () => {
        const wrapper = render(
            <Provider store={store}>
                {React.createElement(requireAuthentication(Home))}
            </Provider>
        );
        expect(wrapper.text()).to.not.contain('Bienvenido');
    });
    test('do not render an `.page`', () => {
        const wrapper = render(
            <Provider store={store}>
                {React.createElement(requireAuthentication(Home))}
            </Provider>
        );
        expect(wrapper.find('.page')).to.have.length(0);
    });
    test('should not render', () => {
        const wrapper = shallow(
            <Provider store={store}>
                {React.createElement(requireAuthentication(Home))}
            </Provider>
        );
        expect(wrapper.contains(<div className="page" />)).to.equal(false);
    });
});

