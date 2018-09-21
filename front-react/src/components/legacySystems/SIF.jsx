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
import * as SIFActions from 'actions/legacySystems/SIF';
import * as DialogsActions from 'actions/common/dialogs';

@connect((store) => {
    return {
        userInfo: store.commonAuth.userInfo,
        menuData: store.commonMenu.data,
        iframeUri: store.legacySystemsIframe.uri,
        sifIsLoaded: store.legacySystemsIframe.sifIsLoaded,
        companySIF: store.commonConfiguration.companySIF
    };
})

/**
 * @desc SIF: Legacy System Component
 */
class SIF extends Component {
    constructor (props) {
        super(props);
        // Check if the iFrame exists on the DOM
        this.exists = 0;
    }
    componentWillMount() {
        if ( this.props.companySIF === null ) {
            this.props.dispatch(DialogsActions.updateSelectCompanyOpen(true));
        } else {
            this._getURI();
            this.exists = window.$('iframe#SIFiFrame').length;
            if ( this.exists !== 0 ) {
                window.$('iframe#SIFiFrame').show();
            }
        }
    }
    /**
     * @desc: Get the URL for the iFrame
     */
    _getURI = () => {
        let menuKey = (!_.isUndefined(this.props.routeParams)) ? this.props.routeParams.menuKey : null ;
        let user = (!_.isUndefined(this.props.userInfo)) ? this.props.userInfo.usuario : null ;
        this.props.dispatch(IFrameActions.updateIFrameURI(menuKey, this.props.menuData, user, this.props.companySIF));
        this.props.dispatch(DialogsActions.updateLoadingOpen(true));
    }
    render() {
        if ( this.props.companySIF !== null ) {
            this.exists = window.$('iframe#SIFiFrame').length;
            if ( this.props.iframeUri !== null && this.exists === 0 ) {
                window.$(document).ready(() => {
                    if ( window.$('iframe#SIFiFrame').length === 0 ) {
                        window.$('#component-wrapper').append('<iframe id="SIFiFrame" name="SIFiFrame" frameBorder="0" width="100%" height="800">Your browser does not support inline frames.</iframe>');
                        window.$('iframe#SIFiFrame').attr('src', this.props.iframeUri);
                        window.$('iframe#SIFiFrame').on('load', () => {
                            this.props.dispatch(DialogsActions.updateLoadingOpen(false));
                            this.props.dispatch(IFrameActions.updateSIFIsLoaded(true));
                        });
                    }
                });
            }
            // Check if the SIF is already loaded and the URIs are the same
            if ( this.props.sifIsLoaded === true ) {
                let currentIFrameURI = window.$('iframe#SIFiFrame').attr('src');
                if ( currentIFrameURI !== this.props.iframeUri ) {
                    window.$('iframe#SIFiFrame').attr('src', this.props.iframeUri);
                    window.$('iframe#SIFiFrame').on('load', () => {
                        this.props.dispatch(DialogsActions.updateLoadingOpen(false));
                    });
                }
            }
        }
        return (
            <div></div>
        );
    }
    componentWillUnmount() {
        if ( this.props.companySIF !== null ) {
            window.$('iframe#SIFiFrame').hide();
            this.props.dispatch(IFrameActions.resetIFrameURI());
        }
    }
}
export default SIF;
