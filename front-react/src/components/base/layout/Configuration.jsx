/**
 * 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
/** Material UI */
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

/**
 * 
 */
class Configuration extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col s3 m3 right">
                <IconButton tooltip="Configuración">
                    <Link to="configuration">
                        <SettingsIcon color='#FFFFFF' />
                    </Link>
                </IconButton>
            </div>
        );
    }
}

export default Configuration;
