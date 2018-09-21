import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import update from 'react/lib/update';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';


const style = {
	border: '1px solid',
	borderRadius: "5px",
	padding: '0.5rem 1rem',
	margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	borderColor: '#FFFFFF',
	boxShadow: "5px 5px 5px #888888"
	
	
};
const iconStyles1 = {
    margin: "2em 0em 0em 2em"
};

const iconStyles2 = {
	margin: "2em 0em 0em 3em",
	color:"#2196F3"
};

class Card extends Component {
	constructor(props) {	 
		super(props);				
		this.onHandleClick =this.onHandleClick.bind(this);					
		this.state = {
			elementos:[]
		}
		this.arr = [];
	}
	 
	onHandleClick(id){		
			
		var _props = this.props,	
			OnpushDNDCardr  = _props.OnpushDNDCardr ;				
		OnpushDNDCardr(id);	
		
	}

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;		
		
		return connectDragSource(connectDropTarget(			
			<div 
				id={this.props.idCard} 
				style={{ ...style, opacity }} 
				onClick={() => this.onHandleClick((this.props.idCard))} 
			>
				 <div className="row">     
                    <div className="col 7"> 
						<strong>{card.text}</strong><br/>
						{"Modulo:"} &nbsp;<strong>{card.modulo}</strong><br/>
						{"Clave:"} &nbsp;<strong>{card.id}</strong>
					</div>
					<div style={{float:"right"}}> 		
						{this.props.listId===1&&card.exists==true?<ActionVisibilityOff style={iconStyles1} />:""}
						{this.props.listId===2&&card.exists==true?<ActionVisibility style={iconStyles2} />:""}
						
					</div>
                </div>	
				
			</div>
		));
	}
}


Card.propTypes = {
  "OnpushDNDCardr": PropTypes.func
};
 

const cardSource = {

	beginDrag(props) {		
		return {			
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();	

		if ( dropResult && dropResult.listId !== item.listId ) {
			props.removeCard(item.index);
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;	

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}		
	}
};

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Card);