'use strict';

/**
 * 
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// Materialize SASS/CSS Framework
import 'roboto-fontface/css/roboto/sass/roboto-fontface-regular.scss';
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize';
import 'styles/main.scss';

import store from 'store';
import routes from 'routes';
/**
 * Target div element
 */
const target = document.getElementById('app');
/**
 * React Router Redux function
 */
const history = syncHistoryWithStore(hashHistory, store);
/**
 * 
 */
render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	target
);
