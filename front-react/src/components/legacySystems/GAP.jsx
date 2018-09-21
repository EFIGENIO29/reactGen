/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
/** Redux actions */
import * as IFrameActions from 'actions/legacySystems/iframe';
import * as DialogsActions from 'actions/common/dialogs';
/** mapStateToProps */
@connect((store) => {
    return {
        userInfo: store.commonAuth.userInfo,
        menuData: store.commonMenu.data,
        iframeUri: store.legacySystemsIframe.uri,
        gapIsLoaded: store.legacySystemsIframe.gapIsLoaded,
    };
})
/**
 * @desc GAP: Legacy System component
 */
class GAP extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount() {
        console.clear();
        // Check if the iFrame exists on the DOM
        let exists = window.$('iframe#GAPiFrame').length;
        if ( exists === 0 ) {
            let menuKey = (!_.isUndefined(this.props.routeParams)) ? this.props.routeParams.menuKey : null ;
            let user = (!_.isUndefined(this.props.userInfo)) ? this.props.userInfo.usuario : null ;
            this.props.dispatch(IFrameActions.updateIFrameURI(menuKey, this.props.menuData, user));
            this.props.dispatch(DialogsActions.updateLoadingOpen(true));
        } else {
            window.$('#GAPLoginForm').hide();
            window.$('#GAPiFrame').show();
        }
    }
    render() {
        // User: 726020572
        // [CENTRAL - ADMINISTRADOR] MARIA FERNANDA NAVARRETE
        // Check if the iFrame exists on the DOM
        let exists = window.$('iframe#GAPiFrame').length;
        if ( this.props.iframeUri !== null && exists === 0 ) {
            window.$(document).ready(() => {
                if ( window.$('iframe#GAPiFrame').length === 0 ) {
                    window.$('#component-wrapper').append('<iframe id="GAPiFrame" name="GAPiFrame" src="'+this.props.iframeUri+'" frameBorder="0" width="100%" height="800">Your browser does not support inline frames.</iframe>');
                    window.$('#GAPLoginForm').submit();
                    window.$('#GAPLoginForm').hide();
                    window.$('iframe#GAPiFrame').on('load', () => {
                        this.props.dispatch(DialogsActions.updateLoadingOpen(false));
                        this.props.dispatch(IFrameActions.updateGAPIsLoaded(true));
                    });
                }
            });
        }
        return (
            <div>
                {this.props.iframeUri !== null && 
                    <form id="GAPLoginForm" target="GAPiFrame" action={this.props.iframeUri} method="POST" style={{'height':0,'width':0,'margin':0,'padding':0}}>
                        <input type="hidden" name="usuario" value={this.props.userInfo.noPersona} />
                        <input type="submit" value="GAP" style={{'height':0,'width':0,'margin':0,'padding':0}} />
                    </form>
                }
            </div>
        );
    }
    componentWillUnmount() {
        window.$('iframe#GAPiFrame').hide();
        this.props.dispatch(IFrameActions.resetIFrameURI());
    }
}
export default GAP;
