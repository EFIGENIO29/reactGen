/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Facultad from 'components/base/layout/Facultades';

@connect((store) => {
    return {
    };
})

/**
 * 
 */
class Facultades extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
        <div className='page'>
                <Facultad />
        </div>
    );
  }
}
export default Facultades;