import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import update from 'react/lib/update';
import CardDND from './Card';
import { DropTarget } from 'react-dnd';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import _ from 'underscore';
 
class Container extends Component {
	constructor(props) {	 
		super(props);		
		this.state = { 
			cards: (typeof (props.list)==="undefined")?[]:props.list,		
			cardsFilter :  (typeof (props.list)==="undefined")?[]:props.list,		
			filtraBusqueda:"",
			banderaFiltraBusqueda:false,
			evCancel: "none",
			searchText: "none" ,
			searchTextRed:"block",
			elementSelected:"",
			banderaUno:false,
			txtDI:props.txtDI,
			txtDII:props.txtDII
		};	
		this.onHandleChange =this.onHandleChange.bind(this);			
		this.findFilter=this.findFilter.bind(this);
		this.onCancel=this.onCancel.bind(this);
		this.handleSearch=this.handleSearch.bind(this);		
		this.handleClickCard=this.handleClickCard.bind(this);		
		this._onKeyPress=this._onKeyPress.bind(this);		
		let listDND="listDND"+props.id
		this.state[listDND]=[];	
			
		
	}
	_onKeyPress(event, id) {		
		if (event.charCode === 13) { // enter key pressed
			event.preventDefault();
			console.log("aquii", id);
		} 
	}
	 
	componentWillUpdate(nextProps, nextState){				
		
		let filtroBusqueda = [];
		
		if((this.props.id==2)&&(this.state.listDND2)){				
			
			if(nextState.filtraBusqueda!=""){
				nextState.cardsFilter.map((item, child) => {    										
					if(item.text.toUpperCase().indexOf(nextState.filtraBusqueda)>=0){
						filtroBusqueda.push(item);
					}
				});				
			}

			if((_.size(filtroBusqueda) > 0)&&(nextState.filtraBusqueda!="")&&(nextState.banderaFiltraBusqueda==true)){			
				this.setState({
					cards: filtroBusqueda,
					banderaFiltraBusqueda:false
				});				
			}
			if((_.size(filtroBusqueda) == 0)&&(nextState.filtraBusqueda!="")&&(nextState.banderaFiltraBusqueda==true)){			
				this.setState({
					cards: filtroBusqueda,
					banderaFiltraBusqueda:false
				});				
			}	
			if((_.size(filtroBusqueda) == 0)&&(nextState.filtraBusqueda=="")&&(nextState.banderaFiltraBusqueda==true)){			
				this.setState({
					cards: this.state.cardsFilter,
					banderaFiltraBusqueda:false
				});				
			}				
			if(nextState.banderaUno == false && this.state.cards.length == 0 && nextState.cards.length == 0 && ((typeof (nextProps.list)==="undefined") == false) && ( _.size(((typeof (nextProps.list)==="undefined")?[]:nextProps.list)) > 0) && ((typeof (nextProps.list)==="undefined") == false) && (_.size(filtroBusqueda) == 0) && (nextState.filtraBusqueda=="")&&(nextState.banderaFiltraBusqueda==false)){											 
			 
				this.setState({
					cards: (typeof (nextProps.list)==="undefined")?[]:nextProps.list,
					cardsFilter: (typeof (nextProps.list)==="undefined")?[]:nextProps.list,
					listDND2: (typeof (nextProps.list)==="undefined")?[]:nextProps.list,
					txtDI:nextProps.txtDI,
					txtDII:nextProps.txtDII
				});				
			}
			if(this.state.cards.length == 1 && nextState.cards.length == 0 && ((typeof (nextProps.list)==="undefined") == false) && ( _.size(((typeof (nextProps.list)==="undefined")?[]:nextProps.list)) > 0) && ((typeof (nextProps.list)==="undefined") == false) && (_.size(filtroBusqueda) == 0) && (nextState.filtraBusqueda=="")&&(nextState.banderaFiltraBusqueda==false)){											 
				this.setState({
					cards: [],
					cardsFilter: [],
					listDND2: [],
					banderaUno:true,
					txtDI:"",
					txtDII:""
				});				
			}
			
		}
		if((this.props.id==1)&&(this.state.listDND1)){

			if(nextState.filtraBusqueda!=""){
				nextState.cardsFilter.map((item, child) => {    										
					if(item.text.toUpperCase().indexOf(nextState.filtraBusqueda)>=0){
						filtroBusqueda.push(item);
					}
				});				
			}
			if((_.size(filtroBusqueda) > 0)&&(nextState.filtraBusqueda!="")&&(nextState.banderaFiltraBusqueda==true)){			
				this.setState({
					cards: filtroBusqueda,
					banderaFiltraBusqueda:false
				});
			}
			if((_.size(filtroBusqueda) == 0)&&(nextState.filtraBusqueda!="")&&(nextState.banderaFiltraBusqueda==true)){			
				this.setState({
					cards: filtroBusqueda,
					banderaFiltraBusqueda:false
				});			
			}	
			if((_.size(filtroBusqueda) == 0)&&(nextState.filtraBusqueda=="")&&(nextState.banderaFiltraBusqueda==true)){			
				this.setState({
					cards: this.state.cardsFilter,
					banderaFiltraBusqueda:false
				});				
			}	
			//if(nextState.cards.length == 0 && ( _.size(((typeof (nextProps.list)==="undefined")?[]:nextProps.list)) > 0) && (_.size(filtroBusqueda) == 0) && (nextState.filtraBusqueda=="")&&(nextState.banderaFiltraBusqueda==false)){
			if(nextState.banderaUno == false && this.state.cards.length == 0 && nextState.cards.length == 0 && ((typeof (nextProps.list)==="undefined") == false) && ( _.size(((typeof (nextProps.list)==="undefined")?[]:nextProps.list)) > 0) && ((typeof (nextProps.list)==="undefined") == false) && (_.size(filtroBusqueda) == 0) && (nextState.filtraBusqueda=="")&&(nextState.banderaFiltraBusqueda==false)){										 
				this.setState({
					cards: (typeof (nextProps.list)==="undefined")?[]:nextProps.list,
					cardsFilter: (typeof (nextProps.list)==="undefined")?[]:nextProps.list,
					listDND2: (typeof (nextProps.list)==="undefined")?[]:nextProps.list,
					txtDI:nextProps.txtDI,
					txtDII:nextProps.txtDII
				});	
			}			
			if(this.state.cards.length == 1 && nextState.cards.length == 0 && ((typeof (nextProps.list)==="undefined") == false) && ( _.size(((typeof (nextProps.list)==="undefined")?[]:nextProps.list)) > 0) && ((typeof (nextProps.list)==="undefined") == false) && (_.size(filtroBusqueda) == 0) && (nextState.filtraBusqueda=="")&&(nextState.banderaFiltraBusqueda==false)){											
				this.setState({
					cards: [],
					cardsFilter: [],
					listDND2: [],
					banderaUno:true,
					txtDI:"",
					txtDII:""	
				});
			}

		}

		
	}
	onCancel(id){		
		
		this.setState({			
			cards: []
		});
		this.setState({
			filtraBusqueda: "",
			evCancel: "none",
			cards: this.state.cardsFilter
		});
		document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[2].style.color="Gray";						
		document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[2].style.disabled=true;						
		
	}
	handleSearch(id){		
		document.getElementById("dndFilter"+id).style.display="block";
		document.getElementById("dndFilterText"+id).style.display="none";		
		document.getElementById("dndFilterIcon"+id).style.border="2px solid #D5D6D8";
		document.getElementById("dndFilterIcon"+id).style.backgroundColor ="#FFFFFF";
		document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[1].style.color="#1E1E1E";						
	}
	findFilter(id){			 
		//debugger				  
		if(this.state.filtraBusqueda!=""){
			let filtroBusqueda = [];
			this.state.cardsFilter.map((item, child) => {    										
				if(item.text.indexOf(this.state.filtraBusqueda.toUpperCase())>=0){
					filtroBusqueda.push(item);
				}
			});
			this.setState({
				cards: filtroBusqueda
			});
		} 
			 
		document.getElementById("dndFilter"+id).style.display="block";
		document.getElementById("dndFilterText"+id).style.display="none";		
		document.getElementById("dndFilterIcon"+id).style.border="2px solid #D5D6D8";
		document.getElementById("dndFilterIcon"+id).style.backgroundColor ="#FFFFFF";
		document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[2].style.color="#1E1E1E";								

	}
 
	onHandleChange(event, newValue){
		//debugger 
		let arrStrBusqueda = [];		
		let id = 0;
		let StrBusqueda = event.target.name;
		arrStrBusqueda = StrBusqueda.split("Buscar");
		id = arrStrBusqueda[1];
		switch(event.target.name){
			case 'Buscar1':    
				this.setState({
					filtraBusqueda: newValue.toUpperCase(),
					banderaFiltraBusqueda:true,
					evCancel: "block"	
				});
			break; 
			case 'Buscar2':    
				this.setState({
					filtraBusqueda: newValue.toUpperCase(),
					banderaFiltraBusqueda:true,
					evCancel: "block"
				});
			break;             
		}
		if(newValue!=""){			 
			document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[2].style.color="#2196F3";						
			document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[2].style.disabled=false;						
		}else{
			/*this.setState({
				filtraBusqueda: newValue.toUpperCase(),
				banderaFiltraBusqueda:true,
				evCancel: "none"
			});*/
			document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[2].style.color="Gray";						
			document.getElementById("dndFilterIcon"+id).childNodes[0].childNodes[0].childNodes[2].style.disabled=true;						
		}

	}
	
	pushCard(card) {
		
		
		if(this.props.id==1){
			this.setState(update(this.state, {
				cards: {
					$push: [ card ]
				},
				cardsFilter: {
					$push: [ card ]
				},				
				listDND1: {
					$push: [ card ]
				}			
			}));
		}
		if(this.props.id==2){			
			card.exists=true;
			this.setState(update(this.state, {
				cards: {
					$push: [ card ]
				},
				cardsFilter: {
					$push: [ card ]
				},
				listDND2: {
					$push: [ card ]
				}			
			}));		
			//debugger
			var _props = this.props,	
				OnpushDNDContainer  = _props.OnpushDNDContainer ;							
			OnpushDNDContainer(this.state);	
		}
		
	}

	removeCard(index) {	
		
		if(this.props.id==1){
			this.setState(update(this.state, {
				cards: {
					$splice: [
						[index, 1]
					]
				},
				cardsFilter: {
					$splice: [
						[index, 1]
					]
				},
				listDND1: {
					$splice: [
						[index, 1]
					]
				} 	
			}));				
		}
		if(this.props.id==2){

			this.setState(update(this.state, {
				cards: {
					$splice: [
						[index, 1]
					]
				},
				cardsFilter: {
					$splice: [
						[index, 1]
					]
				},
				listDND2: {
					$splice: [
						[index, 1]
					]
				} 	
			}));
			
			var _props = this.props,	
				OnpushDNDContainer  = _props.OnpushDNDContainer ;				
			OnpushDNDContainer(this.state);			
			
		}
	
 
	}
	  
	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;		
		const dragCard = cards[dragIndex];

		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		}));
		
	}
	handleClickCard(id){
		
		this.setState({
			elementSelected: id
		});
		
		document.getElementById(id).style.boxShadow = '5px 5px 5px #888888';
		document.getElementById(id).style.borderColor = '#2196F3';

		if(this.state.elementSelected.length > 0){

			document.getElementById(this.state.elementSelected).style.boxShadow = '5px 5px 5px #888888';
			document.getElementById(this.state.elementSelected).style.borderColor = '#FFFFFF';

		}
		 

		
	}
	 
	render() {
			 
		let cards =  this.state.cards;		
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
		const style = {
			width: "45%",
			height: "auto",
			border: '1px solid',
			borderColor: '#9F9F9F'
		};
		
		const backgroundColor = isActive ? '#9F9F9F' : '#EEEEEE';				
		
		return connectDropTarget(
			<div style={{...style, backgroundColor}}>
				<Card>
					<CardActions style={{backgroundColor:"#B71C1C"}}>											 
						<Toolbar  style={{
							backgroundColor:"#FFFFFF",
							padding:"0px 0px",
							width:"100%"									
							}}>							
							<div 
								style={{
									display:this.state.searchText,
									width:"100%"
								}}
								id={"dndFilter"+this.props.id}
							>
								<TextField
									hintText="Buscar por nombre o clave"								
									hintStyle={{
										fontFamily: "Roboto-Regular",										
										fontSize: "14px",
										color: "#212121",
										padding: "0px 0px 0px 15px",
										width:"100%"
									}}									
									style={{									
										width:"90%"
									}}
									inputStyle={{																			
										padding: "0px 0px 0px 15px"
									}}
									underlineFocusStyle={{borderColor: "#E0E0E0"}}
									name={"Buscar"+this.props.id}									
									value={this.state.filtraBusqueda || ''}                 
									onChange={this.onHandleChange}
									onKeyPress={() => this._onKeyPress((this, this.props.id))}									
								/>
							</div>
							<div 
								style={{
									backgroundColor:"#B71C1C", 
									width:"100%",   
									textAlign: "left", 
									color:"#FFFFFF",
									display:this.state.searchTextRed,
									padding:"12px 0px 0px 15px",
									cursor:"pointer"
								}} 
								//onClick={() => this.handleSearch((this.props.id))}
								id={"dndFilterText"+this.props.id}
							>
								{this.props.id===1?this.state.txtDI:this.state.txtDII}
							</div>
							
							<IconButton 
								tooltip="Cancelar"			
								style={{display: this.state.evCancel || ''}}															
								iconStyle={{color:"#9F9D9F"}}
								>
								<ActionCancel									
									onClick={() => this.onCancel((this.props.id))}																		
								/>
							</IconButton>								
							<div 
								style={{ 
									border: "2px solid #B71B1C",
									backgroundColor:"#B71B1C"
								}}
								id={"dndFilterIcon"+this.props.id}
							>
								<IconButton 
									tooltip="Buscar"
									style={{disabled: this.state.evCancel || ''}}															
									onTouchTap={() => this.findFilter((this.props.id))}
									iconStyle={{color:"#ffffff"}}										
									>
									<ActionSearch />
								</IconButton>								
							</div>
						</Toolbar>
					</CardActions>
					<CardText expandable={false}  style={{
							overflow:"auto", 
							maxHeight:"310px", 
							backgroundColor:"#EEEEEE",
							padding: "0px"
							}}>
						{cards.map((card, i) => {							
							return (
								<CardDND 
									key={card.id}
									index={i}
									idCard={"cardDND"+this.props.id+"_"+i}
									listId={this.props.id}
									card={card}										
									OnpushDNDCardr = {this.handleClickCard}
									removeCard={this.removeCard.bind(this)}
									moveCard={this.moveCard.bind(this)} />
							);
						})}
								
					</CardText>						
				</Card>	 
			</div>
		);
  }
}


Container.propTypes = {
  "OnpushDNDContainer": PropTypes.funcs
};
 
 
  
const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem(); 		
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	}
}
 

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Container);
