/**
 * 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
/** Material UI */
import IconMenu from "material-ui/IconMenu";
import IconButton from 'material-ui/IconButton';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import ActionFaceIcon from 'material-ui/svg-icons/action/face';
import AlertWarningIcon from 'material-ui/svg-icons/alert/warning';
/** Custom Styles */
const style = {
    height: 40,
    width: 60,
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
};
/** Icons */
const itemMenuIcons = {
    'mnu_gap': 'assets/images/GAP.png',
    'mnu_buro': 'assets/images/Buro.png',
    'mnu_sic': 'assets/images/SIC.png',
    'mnu_sif': 'assets/images/SIF.png'
};
/**
 * 
 */
class AppMenu extends Component {
    constructor(props) {
        super(props);
        // Content Ref
        this.content = null;
    }
    _handleOnTouchTap = () => {
        // Update the top style attribute
        setTimeout(() => {
            window.$(this.content).parent().parent().parent().parent().parent().css({'top': 64});
        }, 100);
    }
    render() {
        return (
            <div className="col s3 m3 right">
                <IconMenu
                        iconButtonElement={
                            <IconButton tooltip="Aplicaciones más usadas">
                                <AppsIcon color='#FFFFFF' />
                            </IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}} 
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
                        onTouchTap={this._handleOnTouchTap}
                    >
                    <div id='app-menu-content' ref={element => { this.content = element; }}>
                        <div className="row">
                            {/*<div className="col m4 s6">
                                <Paper style={style} zDepth={1}>
                                    <MenuItem containerElement={<Link to="GAP/mnu_gap_01" />}>
                                        <img src={itemMenuIcons['mnu_gap']} width='20px' height='20px' />
                                    </MenuItem>
                                </Paper>
                            </div>
                            <div className="col m4 s6">
                                <Paper style={style} zDepth={1}>
                                    <MenuItem containerElement={<Link to="SIF/mnu_sif_01" />}>
                                        <img src={itemMenuIcons['mnu_sif']} width='20px' height='20px' />
                                    </MenuItem>
                                </Paper>
                            </div>*/}
                            <div className="col m4 s6">
                                <Paper style={style} zDepth={1}>
                                    <a href='http://eureka.serfincor.com.mx/' title='Eureka' target='_blank'>
                                        <ActionFaceIcon style={{'marginTop':'5px'}} />
                                    </a>
                                </Paper>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col m4 s6">
                                <Paper style={style} zDepth={1}>
                                    <a href='http://pao.findep.mx' title='PAO' target='_blank'>
                                        <AlertWarningIcon style={{'marginTop':'5px'}} />
                                    </a>
                                </Paper>
                            </div>
                        </div>
                        {/*
                        <div className="row">
                            <div className="col m4 s6">
                                <Paper style={style} zDepth={1}>
                                    <a href='http://172.30.7.9/MRcgi/MRentrancePage.pl' title='SERVICE DESK' target='_blank'>
                                        <AlertWarningIcon style={{'marginTop':'5px'}} />
                                    </a>
                                </Paper>
                            </div>
                        </div>
                        <div className="col m4 s6">
                            <Paper style={style} zDepth={1}>
                                <MenuItem containerElement={<Link to="BURO/mnu_buro_01" />}>
                                    <img src={itemMenuIcons['mnu_buro']} width='20px' height='20px' />
                                </MenuItem>
                            </Paper>
                        </div>*/}
                        {/*<div className="col m4 s6">
                            <Paper style={style} zDepth={1}>
                                <MenuItem containerElement={<Link to="SIC/mnu_sic_01" />}>
                                    <img src={itemMenuIcons['mnu_sic']} width='20px' height='20px' />
                                </MenuItem>
                            </Paper>
                        </div>*/}
                    </div>
                </IconMenu>
            </div>
        );
    }
}
export default AppMenu;
