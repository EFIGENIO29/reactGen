/**
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import _ from 'underscore';
/** Material-UI */
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import ListItem from 'material-ui/List/ListItem';
import ActionFaceIcon from 'material-ui/svg-icons/action/face';
import AlertWarningIcon from 'material-ui/svg-icons/alert/warning';
/** Redux actions */
import { updateMenuOpen,updateURL } from 'actions/common/menu';
/** Images */
//import LogoImg from 'styles/images/layout/logo-menu.png';
import LogoImg from 'styles/images/layout/horizontal-logo.png';
/** Forms */
import Seguridad from 'components/base/layout/Seguridad';

/** Inline Styles to override the Material-UI Styles */
const styles = {
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
    menu: {
        listItems: {
            'height': '100%',
            'minHeight': '100%',
            'position': 'absolute',
            'top': 0,
            'width': '100%'
        },
        bottomLinks: {
            'position': 'absolute',
            'bottom': 0
        }
    },
    drawer: {
        Root: {
            Opened: {
                color: 'rgba(0, 0, 0, 0.870588)',
                backgroundColor: 'rgb(255, 255, 255)',
                transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                boxSizing: 'border-box',
                boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
                borderRadius: '2px',
                flex: '0 0 16em',
                marginLeft: '0px',
                order: '-1'
            },
            Closed: {
                flex: '0 0 16em',
                marginLeft: '-16em',
                order: '-1'
            }
        },
        Container: {
            Open: {
                borderRadius: '0',
                boxShadow: 'none',
                position: 'static',
                height: 'auto',
                width: 'auto',
                float: 'none',
                top: 'auto',
                left: 'auto'
            }
        }
    }
};
/**
 * Hardcoded
 const itemMenuIcons = {
        'mnu_gap': require('styles/images/menu/icon_ap.jpg'),
        'mnu_buro': require('styles/images/menu/icon_burocredito.png'),
        'mnu_sic': require('styles/images/menu/icon_sic.jpg'),
        'mnu_sif': require('styles/images/menu/icon_sif.jpg')
    };
 */
/** Redux state */
@connect((store) => {
    return {
        menuOpen: store.commonMenu.open,
        menuData: store.commonMenu.data
    };
})
    /**
     * @desc MenuLeft Class Component
     */
class MenuLeft extends Component {
    /**
     *
     */
    constructor (props) {
        super(props);
        this.llama = this.llama.bind(this);
    }
    /**
     *
     */
    _childItems = (parentIndex, parentKey) => {
        let array = [];
        this.props.menuData.map((item, child) => {

            //if ( item.codigoPadre === null ) {
            item.menus.map((childItem, child) => {

                if ( childItem !== null && childItem.codigoPadre === parentKey ) {
                    let i=0;
                    i++;
                    debugger
                    array.push(
                        <ListItem key={child}
                                  innerDivStyle={{marginLeft:'51px'}}
                                  primaryText={
                                      <Link
                                          onClick={this.props.close}
                                          id={childItem.codigoMenu}
                                          to={{ pathname: childItem.codigoModulo + '/' + childItem.codigoMenu}}
                                          key={i+"_sub"}>{childItem.nombre}</Link>
                                  }/>);
                }
            });
            //}
        });
        return array;
    };
    llama(e){
        let urlSelect=false,urlValor="";
        this.props.menuData.map((menu,index)=>{
            urlSelect=(menu.codigoMenu===e.target.id);
            urlValor=(urlSelect)?menu.url:"";
            if(!urlSelect){
                menu.menus.map((hijo)=>{
                    urlSelect=(hijo.codigoMenu===e.target.id);
                    urlValor=(urlSelect)?hijo.url:"";
                    if(!urlSelect){
                        hijo.menus.map((hijo2)=>{
                            urlSelect=(hijo2.codigoMenu===e.target.id);
                            urlValor=(urlSelect)?hijo2.url:"";
                            if(!urlSelect){
                                hijo2.menus.map((hijo3)=>{
                                    urlSelect=(hijo3.codigoMenu===e.target.id);
                                    urlValor=(urlSelect)?hijo3.url:"";
                                });
                            }
                        });
                    }
                });
            }
        });
        this.props.dispatch(updateURL(urlValor))
    }
    childItems(hijos){

        let array = [];
        hijos.map((childItem, child) => {

            //if ( childItem !== null && childItem.codigoPadre === parentKey ) {
            let i=0;
            i++;

            let textLink=(childItem.url!==""&&childItem.url!==null&&typeof (childItem.url)!=="undefined")?<Link
                onClick={this.props.close,this.llama}
                id={childItem.codigoMenu}
                to={{ pathname: 'legacy' + "/" + childItem.codigoModulo + '/' + childItem.codigoMenu}}
                key={childItem.codigoMenu}>{childItem.nombre}</Link>:childItem.nombre;

            array.push(
                <ListItem key={child}
                          innerDivStyle={{paddingLeft:'51px'}}
                          primaryText={textLink}
                          primaryTogglesNestedList={(childItem.menus.length===0)?false:true}
                          nestedItems={(childItem.menus.length>0)?this.childItems(childItem.menus):[]}/>);
            //}
        });
        return array;
    };
    /**
     *
     */
    _handleOnClickNewWindow( type ) {
        let url = null;
        switch( type ) {
            case 'eureka':

                break;
            case 'service_desk':

                break;
        }

    }
    CreaItem(data) {

        let array = [];
        data.map((item, child) => {

            array.push(
                <ListItem key={child}
                          innerDivStyle={{marginLeft:'35px'}}
                          primaryText={
                              <Link
                                  onClick={this.props.close}
                                  id={item.id}
                                  to={item.path}
                                  key={item.key}>{item.name}</Link>
                          }/>);
        });
        return array;
    }
    /**
     *
     */
    render() {

        let Menuitems = this.props.menuData.map((menu, index) => {

            //let leftIcon = (menu.codigoMenu !== 'mnu_buro') ? <img src={itemMenuIcons[menu.codigoMenu]} /> : itemMenuIcons[menu.codigoMenu] ;
            let icon_path = 'assets/images/default.png';
            if (  menu.icono !== null ) {
                icon_path = 'assets/images/' + menu.icono;
            }
            let leftIcon = <img src={icon_path} />;
            // Get only the parent items
            let textLink=(menu.url!==""&&typeof (menu.url)!=="undefined")? <Link
                onClick={this.props.close}
                id={menu.codigoMenu}
                to={{ pathname: 'legacy' + "/" + menu.codigoModulo + '/' + menu.codigoMenu}}
                key={index+"_padre"}>{menu.nombre}</Link>:menu.descripcion;

            return(

                <ListItem
                    innerDivStyle={{paddingLeft:'51px'}}
                    key={index+"_"+menu.codigoModulo}
                    primaryText={menu.codigoModulo}
                    leftIcon={leftIcon}
                    primaryTogglesNestedList={true}
                    nestedItems={[<ListItem
                        innerDivStyle={{paddingLeft:'35px'}}
                        key={index}
                        primaryText={textLink}
                        primaryTogglesNestedList={(menu.menus.length===0)?false:true}
                        nestedItems={(menu.menus.length>0)?this.childItems(menu.menus):[]}/>]}/>
            );
        });
        let rootStyle = ( this.props.menuOpen ) ? styles.drawer.Root.Opened : styles.drawer.Root.Closed ;
        let seguridadItem =  <ListItem
            innerDivStyle={{paddingLeft:'51px'}}
            primaryText={'Seguridad'}
            key={"seguridad"}
            primaryTogglesNestedList={true}
            nestedItems={this.CreaItem(Seguridad)}/>;
        return (
            <Drawer
                open={this.props.menuOpen}
                docked={false}
                style={rootStyle}

                onRequestChange={() => this.props.dispatch(updateMenuOpen(!this.props.menuOpen))}>
                {/*containerStyle={styles.drawer.Container.Open}*/}
                <div style={styles.menu.listItems}>{/* style={styles.menuContainer}*/}
                    <center>
                        <p>
                            <img src={LogoImg} />
                        </p>
                    </center>
                    <Divider />
                    {Menuitems}
                    <Divider />
                    {seguridadItem}
                    <Divider />
                    <a href='http://eureka.serfincor.com.mx/' title='EUREKA' target='_blank'>
                        <ListItem
                            innerDivStyle={{paddingLeft:'51px'}}
                            primaryText={'Eureka'}
                            key={"eureka"}
                            leftIcon={<ActionFaceIcon />}
                        />
                    </a>

                    <a href='http://pao.findep.mx' title='PAO' target='_blank'>
                        <ListItem
                            innerDivStyle={{paddingLeft:'51px'}}
                            primaryText={'PAO'}
                            key={"pao"}
                            leftIcon={<AlertWarningIcon />}
                        />
                    </a>
                    {/*<a href='http://172.30.7.9/MRcgi/MRentrancePage.pl' title='SERVICE DESK' target='_blank'>
                     <ListItem
                     innerDivStyle={{paddingLeft:'51px'}}
                     primaryText={'Service Desk'}
                     key={"service_desk"}
                     leftIcon={<AlertWarningIcon />}
                     />
                     </a>*/}

                    <Divider />
                    <a href='http://www.independencia.com.mx/terminos_y_condiciones/terminos_y_condiciones_de_uso_y_privacidad/' target='_blank'>
                        <ListItem
                            innerDivStyle={{paddingLeft:'51px'}}
                            primaryText={'Términos'}
                            key={"terminos"}
                        />
                    </a>
                    <a href='#'>
                        <ListItem
                            innerDivStyle={{paddingLeft:'51px'}}
                            primaryText={'Contacto'}
                            key={"contacto"}
                        />
                    </a>
                    {/*<div className='row' style={styles.menu.bottomLinks}>
                     <div className='col m12'>
                     <div className='row menu-links'>
                     <div className='col m4 offset-m2'>

                     </div>
                     <div className='col m1'>
                     <span className='center-align'>&nbsp;|</span>
                     </div>
                     <div className='col m4'>

                     </div>
                     </div>
                     </div>
                     </div>*/}
                </div>
            </Drawer>
        );
    }
}
MenuLeft.propTypes = {
    close: PropTypes.function
};
export default MenuLeft;