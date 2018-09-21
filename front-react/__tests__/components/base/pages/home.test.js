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
describe('Components: Base > Pages > Home', () => {
    test('renders the title', () => {
        const wrapper = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        expect(wrapper.text()).to.contain('Bienvenido');
    });
    test('renders an `.page`', () => {
        const wrapper = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        expect(wrapper.find('.page')).to.have.length(1);
    });
    test('should render', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Home />
            </Provider>
        );
        expect(wrapper.contains(<div className="page" />)).to.equal(false);
    });
});

