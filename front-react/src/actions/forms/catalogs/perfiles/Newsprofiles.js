import axios from 'axios';
import _ from 'underscore';
import * as EndpointsConstants from 'constants/endpoints';
import * as DialogsActions from 'actions/common/dialogs';
import PaginationUtils from 'utils/pagination';
import Notification from 'components/base/generic/Notifications/Notification';

export function requestPerfiles(strArgs,dataTable) {
    return (dispatch) => {
        
        const params = {
            'codigoPerfil': strArgs.codigoPerfilNews,
            'descripcion': strArgs.descripcionNews,
            'nombre': strArgs.nombreNews,
            'usuarioAlta':'core'
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_ELEMENTS_STATE_REGISTER',
            payload: []
        });

        /*dispatch({
            type: 'RESET_DIALOGS_STATE_FILTRO_REGISTER',
            payload: []
        });*/

        axios.post(EndpointsConstants.URI_SECURITY_PROFILE_REGISTER, params, config).then((response) => {
            //debugger
            if (response.data.successful && _.size(response.data.payload) > 0) {                                
                
                dataTable.push(response.data.payload);
                if (dataTable.length>10){
                    dataTable.splice( 0, 1 );
                }
                
                dispatch({
                    type: 'UPDATE_OBJETO_REGISTER',
                    payload: dataTable
                });                        

                 Notification.show({
                "message": "Perfil creado con éxito",
                "type": "success"
                });

                
            }else {
                Notification.show({
                    "message": "No se registró el perfil. Por favor, levante un ticket con la clave: "+error.response.data.traceId,
                    "type": "error"
                });
                /*dispatch(DialogsActions.updateDialogProgressOpen(false));
                dispatch(DialogsActions.updateSuccessTitle('Aviso'));
                dispatch(DialogsActions.updateSuccessMsg('No hay prospectos disponibles'));
                dispatch(DialogsActions.updateSuccessOpen(true));*/
            }

        },
        (error) => {
            Notification.show({
                "message": "No se registró el perfil. Por favor, levante un ticket con la clave: "+error.response.data.traceId,
                "type": "error"
            });
            /*dispatch(DialogsActions.updateDialogProgressOpen(false));
            dispatch(DialogsActions.updateErrorTitle('Error'));
            dispatch(DialogsActions.updateErrorMsg('Ha ocurrido un error :' + error));
            dispatch(DialogsActions.updateErrorOpen(true));*/
        });
    }
}


export function requestTablePerfilesNews(value) {
    return {
        type: 'PERFILESCONSULTA_REGISTER',
        payload: value
    };
}
export function resetTableTablePerfilesNews(value) {
    return {
        type: 'RESET_LEADS_STATE_REGISTER',
        payload: value
    };
}

export function requestChangeIndex(value) {
    return {
        type: 'CHANGE_INDEX_REGISTER',
        payload: value
    };
}

export function deleteProfileNew(srtArgs, data,positions){
    

    return (dispatch) => {

        const params = {
            'codigoPerfil': srtArgs.codigoPerfil,
            "usuarioUltimaModificacion": srtArgs.usuarioUltimaModificacion,
            "estatus": srtArgs.estatus
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_PROFILE_UPDATE, params, config).then((response) => {

                if (response.data.successful && response.data.payload > 0) {

                    let mensaje="", mensajeError="";
                    if (positions.length===1){

                        mensaje="Baja de perfil "+data[positions].nombre+ " realizada correctamente";
                        mensajeError="El perfil "+data[positions].nombre+" no se ha dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
                    }else if (positions.length>1){

                        mensaje=response.data.payload.correctos+" perfiles se han dado de baja correctamente";
                        mensajeError=response.data.payload.incorrectos+" perfiles no se han dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
                    }
                    let control=0;
                    positions.map((entidad)=> {
                        data.splice( entidad-control, 1 );
                        control++;
                    });

                    dispatch({
                        type: 'RESET_ELEMENTS_STATE_REGISTER'
                    });
                    dispatch({
                        type: 'UPDATE_OBJETO_REGISTER',
                        payload: data
                    });


                    Notification.show({
                        "message": mensaje,
                        "type": "success"
                    });
                    if (parseInt(response.data.payload.incorrectos)>0){

                        Notification.show({
                            "message": mensajeError,
                            "type": "error"
                        });
                    }
                }else {
                    console.log("response",response);
                }

            },
            (error) => {

                Notification.show({
                    "message": "Por favor levante un ticket con la clave:"+error.response.data.traceId,
                    "type": "error"
                });
            });

    }

};