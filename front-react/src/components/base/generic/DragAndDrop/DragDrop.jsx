import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import PropTypes from 'prop-types';


class DragDrop extends Component {
	 constructor(props) {
        super(props);                
        this.OnpushDND_ = this.OnpushDND_.bind(this);		
    }   
	OnpushDND_ = (objDND)=>{						
		var _props = this.props,	
			OnPushDND  = _props.OnPushDND ;			
		OnPushDND(objDND);			
	} 
	render() {
		const style = {
			display: "flex",
			justifyContent: "space-around"
			//paddingTop: "20px"
		}		
		
		return (
			<div style={{...style}}>
				<Container 
					id={1} 
					list={this.props.facultiesList}					
					OnpushDNDContainer={this.OnpushDND_}
					txtDI={this.props.txtDNDI}
					txtDII={this.props.txtDNDII}
				/>
				<Container 
					id={2} 
					list={this.props.facultiesListAssigned} 
					OnpushDNDContainer={this.OnpushDND_}	
					txtDI={this.props.txtDNDI}
					txtDII={this.props.txtDNDII}				
				/>
			</div>
		);
	}
}

DragDrop.propTypes = {
  "OnPushDND": PropTypes.func
};
 

export default DragDropContext(HTML5Backend)(DragDrop);