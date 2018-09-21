/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import _ from 'underscore';
/** Material UI */
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import {fullWhite, fullBlack, indigo800, blue500, red700} from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';
import IconNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconBash from 'material-ui/svg-icons/content/delete-sweep';
import IconAdd from 'material-ui/svg-icons/action/history';
/** Redux actions */
import * as DialogsActions from 'actions/common/dialogs';
/** Custom Constants */
import * as DialogsConstants from 'constants/dialogs';
import * as SessionConstants from 'constants/session';
/** Session Timer Dialog */
import ReactCountdownClock from 'react-countdown-clock';
/** Custom components */
import SelectFieldCompanySIF from 'components/base/forms/SelectFieldCompanySIF';
import SelectFieldCompanySIC from 'components/base/forms/SelectFieldCompanySIC';
/** Custom Styles */
const styles = {
    error: {
        title: {
            backgroundColor: red700,
            paddingTop: '12px',
            paddingBottom: '12px'
        },
        content: {
            width: '400px'
        }
    },
    welcome: {
        title: {
            backgroundColor: indigo800,
            paddingTop: '12px',
            paddingBottom: '12px',
            color: fullWhite,
            fontSize: '14px'
        },
        content: {
        },
        aliniarCaja:{
            height: '90%',
            /*IMPORTANTE*/
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        label: {
            marginTop: 0,
            paddingTop: 0,
            color: fullBlack,
            lineHeight: '8px',
            height: '10px',
            fontSize: '14px',
        },
        avatarWrapper: {
            marginBottom: '10px'
        },
        avatar: {
            marginTop: '10px'
        },
        actions: {
            container: {
                paddingBottom: '25px',
                paddingRight: '25px',   
            },
            button: {
                backgroundColor: blue500
            }
        }
    }
};
/** Redux state */
@connect((store) => {
    return {
        // Auth
        authProfileObj: store.commonAuth.profileObj,
        //
        dialogError: store.commonDialogs.error,
        loginErrorTitle: store.commonDialogs.loginErrorTitle,
        loginErrorIcon: store.commonDialogs.loginErrorIcon,
        loginErrorText: store.commonDialogs.loginErrorText,
        loginErrorButtonText: store.commonDialogs.loginErrorButtonText,
        loginErrorOpen: store.commonDialogs.loginErrorOpen,
        // Common
        dialogUserWelcome: store.commonDialogs.userWelcome,
        dialogLoading: store.commonDialogs.loading,
        dialogSessionTimer: store.commonDialogs.sessionTimer,
        // Select company
        dialogSelectCompany: store.commonDialogs.selectCompany,
        // User faculties
        profilesFaculties: store.commonAuth.profilesFaculties,
        // Company Selected: SIF and SIC
        userCanSeeSIF: store.commonConfiguration.userCanSeeSIF,
        companySIF: store.commonConfiguration.companySIF,
        userCanSeeSIC: store.commonConfiguration.userCanSeeSIC,
        companySIC: store.commonConfiguration.companySIC,
        openDialog: store.commonDialogs.openDialog,
        dialogErrorTitle: store.commonDialogs.errorTitle,
        dialogErrorMsg: store.commonDialogs.errorMsg,
        confirm: store.commonDialogs.confirm
    };
})
/**
 * 
 */
class Dialogs extends Component {
    /**
     * 
     */
    constructor(props) {
        super(props);
        // Bind methods
        this._handleCloseErrorDialog = this._handleCloseErrorDialog.bind(this);
        this._handleCloseSessionTimer = this._handleCloseSessionTimer.bind(this);
        this._handleCloseLoadingDialog = this._handleCloseLoadingDialog.bind(this);
        this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
        // Component
        this.state = {
            userWelcomeCloseBtnDisabled: true
        };
    }
    /**
     * @function _handleCloseUserWelcomeDialog
     * @desc Close the dialog that contains the user welcome
     */
    _handleCloseUserWelcomeDialog = () => {
        this.props.dispatch(DialogsActions.updateUserWelcomeOpen(false));
    }
    /**
     * @function Close the dialog that contains the error
     */
    _handleCloseErrorDialog() {
        this.props.dispatch(DialogsActions.updateLoginErrorOpen(false));
        this.props.dispatch(DialogsActions.updateErrorOpen(false));
    }
    /**
     * @function Close the dialog that contains the Session Timer
     */
    _handleCloseSessionTimer() {
        this.props.dispatch(DialogsActions.updateSessionTimerOpen(false));
    }
    /**
     * @function Close the dialog that contains the Loading
     */
    _handleCloseLoadingDialog() {
        this.props.dispatch(DialogsActions.updateLoadingOpen(false));
        window.location.href = '/#/home';
        this.props.dispatch(push('/#/home'));
    }
    /**
     * @function Close the dialog and redirect to home
     */
    _handleCloseSelectCompany = () => {
        this.props.dispatch(DialogsActions.updateSelectCompanyOpen(false));
        window.location.href = '/#/home';
        this.props.dispatch(push('/#/home'));
    }
    /**
     * 
     */
     handleCloseProgressLine = () => {
        this.props.dispatch(DialogsActions.updateDialogProgressOpen(false));        
    }
    /**
     *
     */
     handleCloseConfirm = () => {

         this.props.dispatch(DialogsActions.resetState());
     };
    handleDeleteActiveConfirm = () => {

         let response={
                "delete": (this.props.confirm.accion==="I")?true:false,
                "active": (this.props.confirm.accion==="A")?true:false,
                "mostrar": false,
                "descripcion": ""
         };
         this.props.dispatch(DialogsActions.confirmEstatus(response));
     };


    render() {
        let LoginErrorDialogActions = [
            <FlatButton 
                label="Aceptar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseErrorDialog}
                />,
        ];
        
        // User Welcome Dialog
        let userWelcomeCloseBtnDisabled = true;
        if (this.props.userCanSeeSIF === true && this.props.userCanSeeSIC === true) {
            userWelcomeCloseBtnDisabled = (this.props.companySIF !== null && this.props.companySIC !== null) ? false : true ;
        } else if (this.props.userCanSeeSIF === true) {
            userWelcomeCloseBtnDisabled = (this.props.companySIF !== null) ? false : true ;
        } else if (this.props.userCanSeeSIC === true) {
            userWelcomeCloseBtnDisabled = (this.props.companySIC !== null) ? false : true ;
        }
        const UserWelcomeDialogActions = [
            <RaisedButton 
                label="Continuar"
                disabled={userWelcomeCloseBtnDisabled}
                keyboardFocused={true}
                labelColor={fullBlack}
                backgroundColor={styles.welcome.actions.button.backgroundColor}
                onTouchTap={this._handleCloseUserWelcomeDialog}
                style={{marginRight: "8px"}}
                />,
        ];
        const UserWelcomeDialogShowLabel = this.props.userCanSeeSIF === true || this.props.userCanSeeSIC === true;
        // iFrame Loading
        let LoadingDialogActions = [
            <FlatButton 
                label="Cancelar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseLoadingDialog}
                />,
        ];
        let SessionTimerDialogActions = [
            <FlatButton 
                label="Cerrar sesión"
                primary={true}
                onTouchTap={this.props._handleLogoutOnClick}
                />,
            <FlatButton 
                label="Continuar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseSessionTimer}
                />,
        ];
        let SelectCompanyDialogActions = [
            <FlatButton 
                label="Seleccionar"
                primary={true}
                onTouchTap={this._handleCloseSelectCompany}
                />
        ];


         let ErrorDialogActions = [
            <FlatButton
                label="Cerrar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseErrorDialog}
            />,
        ];
        let ErrorDialogActionsModal = [
            <FlatButton
                label="Regresar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseErrorDialogModalContinue}
            />,
        ];
        let SuccessDialogActions = [
            <FlatButton
                label="Cerrar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseSuccessDialog}
            />,
        ];
        let DeteleAllDialogActions = [
            <FlatButton
                label="Cerrar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseDeleteAllDialog}
            />,
            <FlatButton
                label="Continuar"
                secondary={true}
                keyboardFocused={false}
                onTouchTap={this._handleConfirmDeleteAllDialog}
            />,
        ];

        let SendDataToFormiikActions = [
            <FlatButton
                label="Cerrar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseSendToFormiikDialog}
            />,
            <FlatButton
                label="Continuar"
                secondary={true}
                keyboardFocused={false}
                onTouchTap={this._handleConfirmSendToFormiikDialog}

            />,
        ];

        let ConfirmDialogActions = [
            <FlatButton
                label="CANCELAR"
                keyboardFocused={false}
                hoverColor={"#eAeAeA"}
                rippleColor={"#212121"}
                onTouchTap={this.handleCloseConfirm}
            />,
            <FlatButton
                label="ACEPTAR"
                primary={true}
                keyboardFocused={false}
                labelStyle={{color: "#2196F3"}}
                hoverColor={"#E4F2FD"}
                rippleColor={"#2196f3"}
                onTouchTap={this.handleDeleteActiveConfirm}

            />,
        ], Mensaje=(this.props.confirm.accion==="A")?"alta":"baja",
        iconUse=(this.props.confirm.accion==="A")?<IconAdd style={{"height": "85px", "width": "89px"}}/>:<IconBash style={{"height": "85px", "width": "89px"}}/>;

        const actionsProgress = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleCloseProgressLine}
            />];

        return (
        <div>
            {/* General Error dialog */}
            <Dialog
                title={<div className='row'>
                        <div className='col s6 m4'>
                            <IconButton 
                                tooltip="Cerrar"
                                onTouchTap={this._handleCloseErrorDialog}>
                                <NavigationArrowBack color={fullWhite} />
                            </IconButton>
                        </div>
                        <div className='col s6 m8'>
                            <p style={{color: 'white', fontSize: '16px', lineHeight: '20px'}}>{this.props.loginErrorTitle}</p>
                        </div>
                    </div>}
                titleStyle={styles.error.title}
                contentStyle={styles.error.content}
                modal={true}
                actions={LoginErrorDialogActions}
                open={this.props.loginErrorOpen}
                >
                <div>
                    {this.props.loginErrorIcon === true && (
                        <IconPriorityHigh color={red700} />
                    )}
                    <p>{this.props.loginErrorText}</p>
                    <p>{this.props.loginErrorButtonText}</p>
                </div>
            </Dialog>
            {/* User welcome dialog */}
            <Dialog
                title={<div>
                        <p>Bienvenido {this.props.authProfileObj.name}</p>
                    </div>}
                titleStyle={styles.welcome.title}
                contentStyle={styles.welcome.content}
                actionsContainerStyle={styles.welcome.actions}
                modal={true}
                open={this.props.dialogUserWelcome}
                actions={UserWelcomeDialogActions}
                onRequestClose={this._handleCloseUserWelcomeDialog}
                >
                    <div className='row'>
                        <div className='row' style={styles.welcome.avatarWrapper}>
                            <div className='col m12 s12'>
                                <center>
                                    <Avatar 
                                    src={this.props.authProfileObj.imageUrl}
                                    size={100}
                                    style={styles.welcome.avatar} />
                                </center>
                            </div>
                        </div>
                        <div className='row'>
                            <div >
                                {UserWelcomeDialogShowLabel === true && (
                                    <p style={styles.welcome.label}>Por favor seleccione la empresa a la que quiere acceder:</p>
                                )}
                            </div>
                            <div  style={styles.welcome.aliniarCaja}>
                                {this.props.userCanSeeSIF === true && (
                                    <div >
                                        <SelectFieldCompanySIF height={200} />
                                    </div>
                                )}
                                {this.props.userCanSeeSIC === true && (
                                    <div >
                                        <SelectFieldCompanySIC height={200} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
            </Dialog>
            {/* Loading dialog */}
            <Dialog
                title={DialogsConstants.DIALOGS_LOADING_TITLE}
                modal={true}
                actions={LoadingDialogActions}
                open={this.props.dialogLoading}
                >
                <CircularProgress size={80} thickness={5} />
            </Dialog>
            {/* Session Timer dialog */}
            <Dialog
                title={DialogsConstants.DIALOGS_SESSION_TIMER_TITLE}
                modal={true}
                contentStyle={DialogsConstants.DIALOGS_SESSION_TIMER_STYLE}
                actions={SessionTimerDialogActions}
                open={this.props.dialogSessionTimer}
                >
                <p>{DialogsConstants.DIALOGS_SESSION_TIMER_BODY}</p>
                <ReactCountdownClock 
                    seconds={SessionConstants.SESSION_DIALOG_COUNTDOWN_DURATION_TIMER}
                    color="#000000"
                    alpha={0.2}
                    size={DialogsConstants.DIALOGS_SESSION_COUNTDOWN_SIZE}
                    onComplete={this.props._handleLogoutOnClick} />
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </Dialog>
            {/* Select Company dialog */}
            <Dialog
                modal={true}
                actions={SelectCompanyDialogActions}
                open={this.props.dialogSelectCompany}
                >
                <p>Debe seleccionar una empresa.</p>
            </Dialog>
            {/*Progress Modal*/}
            {
                <Dialog
                    title="Procesando"
                    actions={actionsProgress}
                    modal={true}
                    open={this.props.openDialog}
                >
                    <LinearProgress mode="indeterminate"/>

                </Dialog>

            }
            {/* Error */}
                {<Dialog
                title={<div className='row'>
                    <div className='col s6 m4'>
                        <IconButton
                            tooltip="Cerrar"
                            onTouchTap={this._handleCloseErrorDialog}>
                            <IconNavigationArrowBack color={fullWhite}/>
                        </IconButton>
                    </div>
                    <div className='col s6 m8'>
                        <p style={{
                            color: 'white',
                            fontSize: '16px',
                            lineHeight: '20px'
                        }}>{this.props.dialogErrorTitle}</p>
                    </div>
                </div>}
                titleStyle={styles.error.title}
                contentStyle={styles.error.content}
                modal={true}
                open={this.props.dialogError}
                actions={ErrorDialogActions}
                onRequestClose={this._handleCloseErrorDialog}
            >
                <p>{this.props.dialogErrorMsg}</p>
            </Dialog>}
            {/* Error */}
                {<Dialog
                    title={<div className='row'>
                        <div className='col s6 m4'>
                            <IconButton
                                tooltip="Cerrar"
                                onTouchTap={this._handleCloseErrorDialog}>
                                <IconNavigationArrowBack color={fullWhite}/>
                            </IconButton>
                        </div>
                        <div className='col s6 m8'>
                            <p style={{
                                color: 'white',
                                fontSize: '16px',
                                lineHeight: '20px'
                            }}>{this.props.dialogErrorTitle}</p>
                        </div>
                    </div>}
                    titleStyle={styles.error.title}
                    contentStyle={styles.error.content}
                    modal={true}
                    open={this.props.dialogError}
                    actions={ErrorDialogActions}
                    onRequestClose={this._handleCloseErrorDialog}
                >
                    <p>{this.props.dialogErrorMsg}</p>
                </Dialog>}
            {/* Confirm */}
                {<Dialog
                    title={<div className='row'>
                        <div className='col s8 m12'>
                            <p style={{
                                color: '#FFFFFF',
                                fontSize: '24px',
                                lineHeight: '0px'
                            }}>{"Confirmación de "+Mensaje}</p>
                        </div>
                    </div>}
                    titleStyle={styles.error.title}
                    contentStyle={styles.error.content}
                    modal={true}
                    open={this.props.confirm.mostrar}
                    actions={ConfirmDialogActions}
                >
                    <div style={{"textAlign": "-webkit-center"}}>
                        {iconUse}
                    </div>
                    <p>{this.props.confirm.descripcion}</p>
                </Dialog>}
        </div>
        );
    }
}
Dialogs.propTypes = {
  _handleLogoutOnClick: PropTypes.func
};
export default Dialogs;
