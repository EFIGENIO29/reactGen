/**
 * 
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/** Material-UI */
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import {blueA200} from 'material-ui/styles/colors';
/** Custom Styles */
const styles = {
    badge: {
        root: {
            paddingTop: '2px',
            paddingBottom: '2px'
        },
        content: {
            top: 3,
            right: 10,
            color: 'white',
            backgroundColor: blueA200
        }
    },
    icon: {

    }
};

class UnreadMessages extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col s3 m3 right">
                <a href='https://gmail.com' target='_blank'>
                    <Badge
                        style={styles.badge.root}
                        badgeContent={this.props.data}
                        badgeStyle={styles.badge.content}
                        >
                        <IconButton tooltip="Correos no leídos">
                            <EmailIcon color='#FFFFFF' style={styles.icon} />
                        </IconButton>
                    </Badge>
                </a>
            </div>
        );
    }
}
UnreadMessages.propTypes = {
    data: PropTypes.object
};
export default UnreadMessages;
