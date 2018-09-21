/**
 * 
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import _ from 'underscore';
/** Redux actions */
import * as IFrameActions from 'actions/legacySystems/iframe';
import * as DialogsActions from 'actions/common/dialogs';
import * as EndpointsConstants from 'constants/endpoints';

/** mapStateToProps */

/**
 * @desc RIF: Legacy System component
 */





class RIF extends Component {
    constructor (props) {
        super(props);             
        this.state = {
            iFrameHeight:""
        }    
    }

    componentWillMount() {

        //console.log(this.refs.iframe);

    }
    componentDidMount() {
       const obj = ReactDOM.findDOMNode(this);
       //console.log("iFrameHeight",  obj,this.refs.iframe);
    }

    render() {

        return(
            <div style={{
                    position:'relative',
                    height:'0',                    
                    maxWidth:'100%',
                    paddingBottom:'56.25%'
                    }}>            
            <iframe src={EndpointsConstants.URI_RIF_EMPLOYEES} 
                style={{
                    position:'absolute',
                    top:'0',
                    left:'0',
                    width:'100%',
                    height:"2630px",
                    border:0
                    }}
                
                ></iframe>
            </div>
        );
    };
}


export default RIF;
