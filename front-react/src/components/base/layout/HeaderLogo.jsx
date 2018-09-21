/**
 * 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
/** Custom Constants */
import * as CommonConstants from 'constants/dialogs';
/** Images */
import LogoImg from 'styles/images/layout/logo-header.png';

class HeaderLogo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='header-logo'>
                <Link to='home'>
                    <img src={LogoImg} title={CommonConstants.COMMON_LAYOUT_HEADER_TITLE_IMAGE} />
                </Link>
            </div>
        );
    }
}
export default HeaderLogo;
