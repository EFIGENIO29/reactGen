/*eslint no-underscore-dangle: "warn"*/

/**
 * 
 */
import { applyMiddleware, createStore, compose } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import _ from 'underscore';

const logger = createLogger();
let middleware = null;
let store =  null;

// Only the development enviroment can log the redux actions
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing') {
    //middleware = applyMiddleware(thunk, logger, routerMiddleware(browserHistory));
    middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));
} else {
    middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));
}
// Only chrome can handle the redux dev tool
// redux compose cannot handle a null or undefined middleware
if (
    window.navigator.userAgent.includes('Chrome') && 
    !_.isUndefined(window.__REDUX_DEVTOOLS_EXTENSION__) && 
    process.env.NODE_ENV !== 'production' 
) {
    store = createStore(
        rootReducer,
        compose(
            middleware,
            autoRehydrate(),
            window.__REDUX_DEVTOOLS_EXTENSION__ && 
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} else {
    store = createStore(
        rootReducer,
        compose(
            middleware,
            autoRehydrate()
        )
    );
}
persistStore(store);
export default store;
