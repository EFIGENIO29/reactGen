/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
/** Redux actions */
import * as IFrameActions from 'actions/legacySystems/iframe';
import * as DialogsActions from 'actions/common/dialogs';
/** mapStateToProps */
@connect((store) => {
    return {
        menuData: store.commonMenu.data,
        iframeUri: store.legacySystemsIframe.uri,
        buroIsLoaded: store.legacySystemsIframe.buroIsLoaded
    };
})
/**
 * @desc Legacy System Component
 */
class BURO extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount() {
        if ( this.props.buroIsLoaded === false ) {
            this.props.dispatch(IFrameActions.updateIFrameURI(this.props.routeParams, this.props.menuData));
            this.props.dispatch(DialogsActions.updateLoadingOpen(true));
            window.$(document).ready(() => {
                window.$('#component-wrapper').append('<iframe id="BUROiFrame" name="BUROiFrame" src="'+this.props.iframeUri+'" frameBorder="0" width="100%" height="800">Your browser does not support inline frames.</iframe>');
                window.$('iframe#BUROiFrame').on('load', () => {
                    this.props.dispatch(DialogsActions.updateLoadingOpen(false));
                    this.props.dispatch(IFrameActions.updateBUROIsLoaded(true));
                });
            });
        } else {
            window.$('#BUROiFrame').show();
        }
    }
    render() {
        return (
            <div>
            </div>
        );
    }
    componentWillUnmount() {
        window.$('#BUROiFrame').hide();
        this.props.dispatch(IFrameActions.resetIFrameURI());
    }
}
export default BURO;
