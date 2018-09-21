import axios from 'axios';
import __ from "underscore";
import _ from 'lodash';
import * as EndpointsConstants from 'constants/endpoints';
import Notification from 'components/base/generic/Notifications/Notification';

export function resetTable(){
    return (dispatch) => {
        dispatch({
            type: 'RESET_TABLE'
        });

    }
};
export function resetTableAdd(){
    return (dispatch) => {
         dispatch({
            type: 'RESET_TABLE_NEW'
         });

    }
};
export function resetTableActual(){
    return (dispatch) => {
         dispatch({
            type: 'RESET_TABLE_ACTUAL'
         });

    }
};
export function catModulos() {

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_MODULOS, {}, config).then((response) => {

                dispatch({
                    type: 'CATMODULOS_DATA',
                    payload: response.data.payload,
                });
            },
            (error) => {
                console.log(error);
            });

    }
};
export function consultaModulos(srtArgs) {
    return (dispatch) => {

        let params = {
            "codigoModulo": srtArgs.codigoModulo,
            "nombre": (srtArgs.nombre==="")?null:srtArgs.nombre,
            "estatus": (srtArgs.estatus==="")?null:srtArgs.estatus,
            "fechaHoraAlta": srtArgs.fecha
        };


        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_TABLE'
        });

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_MODULOS, params, config).then((response) => {

                dispatch({
                    type: 'MODULOSCONSULTA_FILTRO',
                    payload: response.data.payload,
                });
            },
            (error) => {
                console.log(error);
            });

    }
};
export function updateObject(value) {
    return {

        type: 'UPDATE_OBJETO',
        payload: value
    };
};
export function resetObject(value) {
    return {

        type: 'RESET_OBJETO',
        payload: value
    };
};
export function updateTableActual(data) {

    return (dispatch) => {
        dispatch({
            type: 'TABLE_ACTUAL',
            payload: data
        });

    }
};
export function actualizaModulo(srtArgs,data){

    return (dispatch) => {

        const params = {
            'nombre': srtArgs.nombre,
            'descripcion': srtArgs.descripcion,
            'codigoModulo': srtArgs.codigoModulo,
            "usuarioUltimaModificacion": srtArgs.usuarioUltimaModificacion,
            "estatus": (srtArgs.estatus==="ACTIVO")?"A":"I"
        };

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_TABLE'
        });
        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_MODULO, params, config).then((response) => {

                if (response.data.successful && response.data.payload === 1) {

                    data[srtArgs.index].descripcion=srtArgs.descripcion;
                    data[srtArgs.index].nombre=srtArgs.nombre;
                    dispatch({
                        type: 'UPDATE_TABLE',
                        payload: data,
                    });
                    Notification.show({
                        "message": "El módulo "+data[srtArgs.index].nombre+ " ha sido actualizado exitosamente",
                        "type": "success"
                    });
                }else {
                    console.log("response",response);
                }

            },
            (error) => {
                Notification.show({
                    "message": "Por favor levante un ticket con la clave: "+error.response.data.traceId,
                    "type": "error"
                });
            });

    }

};
export function actualizaModuloNew(srtArgs, data){

    return (dispatch) => {

        const params = {
            'nombre': srtArgs.nombre,
            'descripcion': srtArgs.descripcion,
            'codigoModulo': srtArgs.codigoModulo,
            "usuarioUltimaModificacion": srtArgs.usuarioUltimaModificacion,
            "estatus": (srtArgs.estatus==="ACTIVO")?"A":"I"
        };

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_TABLE_NEW'
        });
        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_MODULO, params, config).then((response) => {

                if (response.data.successful && response.data.payload === 1) {

                    data[srtArgs.index].descripcion=srtArgs.descripcion;
                    dispatch({
                        type: 'TABLE_NEW',
                        payload: data,
                    });
                    Notification.show({
                        "message": "El módulo "+data[srtArgs.index].codigoModulo+ " ha sido actualizado exitosamente",
                        "type": "success"
                    });

                }else {
                    console.log("response",response);
                }

            },
            (error) => {
                Notification.show({
                    "message": "Por favor levante un ticket con la clave: "+error.response.data.traceId,
                    "type": "error"
                });
            });

    }

};
export function deleteModulNew(srtArgs, data){

    return (dispatch) => {

        const params = {
            'codigosModulos': srtArgs.codigosModulos,
            "usuarioUltimaModificacion": srtArgs.usuarioUltimaModificacion,
            "estatus": srtArgs.estatus
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_BAJA_ALTA_MODULOS, params, config).then((response) => {

                if (response.data.successful && typeof (response.data.payload) ==="object") {

                    let mensaje="", mensajeError="";
                    if (srtArgs.positions.length===1){

                        mensaje="Baja de módulo "+data[srtArgs.positions].nombre+ " realizada correctamente";
                        mensajeError="El módulo "+data[srtArgs.positions].nombre+" no se ha dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
                    }else if (srtArgs.positions.length>1){

                        mensaje=response.data.payload.correctos+" módulos se han dado de baja correctamente";
                        mensajeError=response.data.payload.incorrectos+" módulos no se han dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
                    }
                    let control=0;
                    srtArgs.positions.map((entidad)=> {
                        data.splice( entidad-control, 1 );
                        control++;
                    });

                    dispatch({
                        type: 'RESET_TABLE_NEW'
                    });
                    dispatch({
                        type: 'TABLE_NEW',
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

export function agregaModulo(srtArgs, data){

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

         dispatch({
             type: 'RESET_TABLE_NEW'
         });

        axios.post(EndpointsConstants.URI_SECURITY_ADD_MODULO, srtArgs, config).then((response) => {

                if (response.data.successful && __.size(response.data.payload)>0) {

                    data.push(response.data.payload);
                    if (data.length>10){
                        data.splice( 0, 1 );
                    }
                    dispatch({
                        type: 'TABLE_NEW',
                        payload: data
                    });
                    Notification.show({
                        "message": "Nuevo registro de módulo creado con éxito",
                        "type": "success"
                    });
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
export function deleteActiveModul(srtArgs,data,positions){

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_SECURITY_BAJA_ALTA_MODULOS, srtArgs, config).then((response) => {

                if (response.data.successful && typeof (response.data.payload) ==="object") {

                    let mensaje="", mensajeError="", mensajeAccion=(srtArgs.estatus==="I")?"Baja":"Alta", mensajeAccion1=(srtArgs.estatus==="I")?"baja":"alta";
                    if (positions.length===1){

                        mensaje=mensajeAccion+" de módulo "+data[positions].nombre+ " realizada correctamente";
                        mensajeError="El módulo "+data[positions].nombre+" no se ha dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
                    }else if (positions.length>1){

                        mensaje=response.data.payload.correctos+" módulos se han dado de "+mensajeAccion1+" correctamente";
                        mensajeError=response.data.payload.incorrectos+" módulos no se han dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
                    }
                    let control=0;
                    positions.map((entidad)=> {


                        data.splice( entidad-control, 1 );
                        control++;
                    });

                    dispatch({
                        type: 'UPDATE_TABLE',
                        payload: data,
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