/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from 'components/base/layout/Dashboard';

@connect((store) => {
    return {
    };
})

/**
 * 
 */
class Home extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
        <div className='page'>
            <Dashboard />
        </div>
    );
  }
}
export default Home;
