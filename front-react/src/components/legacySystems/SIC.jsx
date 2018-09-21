/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
/** Redux actions */
import * as IFrameActions from 'actions/legacySystems/iframe';
import * as DialogsActions from 'actions/common/dialogs';

@connect((store) => {
    return {
        userInfo: store.commonAuth.userInfo,
        menuData: store.commonMenu.data,
        iframeUri: store.legacySystemsIframe.uri,
        sicIsLoaded: store.legacySystemsIframe.sicIsLoaded,
        menuKey: store.legacySystemsIframe.menuKey,
        companySIC: store.commonConfiguration.companySIC
    };
})
/**
 * @desc SIC: Legacy System Component
 */
class SIC extends Component {
    constructor (props) {
        super(props);
        // Iframes created
        this.iFramesCreated = [];
        // iFrames URIs
        this.iFramesURis = [];
    }
    componentWillMount() {
        // Hide the iFrame
        window.$('iframe').hide();
        this.props.dispatch(IFrameActions.updateMenuKey(this.props.routeParams.menuKey));
        if ( this.props.companySIC === null ) {
            this.props.dispatch(DialogsActions.updateSelectCompanyOpen(true));
        } else {
            this._getURI();
            // Set the name of the iFrame
            let iFrameName = 'SICiFrame-'+this.props.routeParams.menuKey+'-'+this.props.companySIC;
            let exists = window.$('iframe#'+iFrameName).length;
            if ( exists !== 0 ) {
                window.$('iframe#'+iFrameName).show();
            }
        }
        console.clear();
    }
    /**
     * @desc: Get the URL for the iFrame
     */
    _getURI = () => {
        let menuKey = (!_.isUndefined(this.props.routeParams)) ? this.props.routeParams.menuKey : null ;
        let user = (!_.isUndefined(this.props.userInfo)) ? this.props.userInfo.usuario : null ;
        this.props.dispatch(IFrameActions.updateIFrameURI(menuKey, this.props.menuData, user, this.props.companySIC));
    }
    render() {
        if ( this.props.companySIC !== null ) {
            // If the user select another menu item
            // Update the menuKey and get again the URL
            if ( this.props.menuKey !== this.props.routeParams.menuKey ) {
                this._getURI();
                this.props.dispatch(IFrameActions.updateMenuKey(this.props.routeParams.menuKey));
            }
            // Set the name of the iFrame
            let iFrameName = 'SICiFrame-'+this.props.routeParams.menuKey+'-'+this.props.companySIC;
            // Check the URLs of all iframes
            window.$('iframe[name=SICiFrame]').each((index, element) => {
                this.iFramesURis.push(window.$(element).attr('src'));
            });
            // Check if the iFrame exists on the DOM
            let exists = window.$('iframe#'+iFrameName).length;
            if ( this.props.iframeUri !== null && exists === 0 ) {
                window.$(document).ready(() => {
                    // Check if the iFrame does not exists and the URL does not exists already
                    if ( !_.contains(this.iFramesCreated, iFrameName) && !_.contains(this.iFramesURis, this.props.iframeUri) ) {
                        this.iFramesCreated.push(iFrameName);
                        window.$('iframe').hide();
                        this.props.dispatch(DialogsActions.updateLoadingOpen(true));
                        window.$('#component-wrapper').append('<iframe id="'+iFrameName+'" name="SICiFrame" frameBorder="0" width="100%" height="800">Your browser does not support inline frames.</iframe>');
                        window.$('iframe#'+iFrameName).attr('src', this.props.iframeUri);
                        window.$('iframe#'+iFrameName).on('load', () => {            
                            this.props.dispatch(DialogsActions.updateLoadingOpen(false));
                            this.props.dispatch(IFrameActions.updateSICIsLoaded(true));
                        });
                    }
                });
            }
        }
        return (
            <div></div>
        );
    }
    componentWillReceiveProps(nextProps) {
        // Set the name of the iFrame
        let iFrameName = 'SICiFrame-'+this.props.routeParams.menuKey+'-'+this.props.companySIC;
        // Check if the iFrame exists and is not shown
        console.log('name:', iFrameName);
        if ( window.$('iframe#'+iFrameName).length === 1 && window.$('iframe#'+iFrameName).is(':visible') === false ) {
            window.$('iframe').hide();
            window.$('iframe#'+iFrameName).show();
        }
    }
    componentWillUnmount() {
        if ( this.props.companySIC !== null ) {
            // Hide the iFrame
            window.$('iframe').hide();
            this.props.dispatch(IFrameActions.resetIFrameURI());
        }
    }
}
export default SIC;
