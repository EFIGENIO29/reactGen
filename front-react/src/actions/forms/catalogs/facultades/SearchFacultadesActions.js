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
export function catFacultades() {

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_FACULTY_CONSULT, {}, config).then((response) => {

                dispatch({
                    type: 'CATFACULTADES_DATA',
                    payload: response.data.payload,
                });
            },
            (error) => {
                console.log(error);
            });

    }
};
export function consultaFacultades(srtArgs) {
    return (dispatch) => {

        let params = {
            "codigoFacultad": srtArgs.codigoFacultad,
            "nombre": (srtArgs.nombre==="")?null:srtArgs.nombre,
            "estatus": (srtArgs.estatus==="")?null:srtArgs.estatus,
            "modulo": {"codigoModulo": (srtArgs.modulo==="")?null:srtArgs.modulo}
        };


        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_TABLE'
        });

        axios.post(EndpointsConstants.URI_SECURITY_FACULTY_CONSULT, params, config).then((response) => {

                dispatch({
                    type: 'FACULTADESCONSULTA_FILTRO',
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
export function resetObject() {
    return {

        type: 'RESET_OBJETO'
    };
};
export function arbolMenu(value) {

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_ARBOL_MENU'
        });

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_ARBOL_MENU, value, config).then((response) => {


                if (response.data.successful && typeof (response.data.payload)==="object") {


                    dispatch({
                        type: 'ARBOL_MENU',
                        payload: response.data.payload,
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
export function agregaFacultad(facultad,menu, facultadMenu, data){

    return (dispatch) => {
        let facultadAdd={
            "codigoFacultad": facultad.codigoFacultad,
            "nombre": facultad.nombre,
            "descripcion": facultad.descripcion,
            "modulo": facultad.modulo,
            "tipoFacultad": facultad.tipoFacultad,
            "usuarioAlta": facultad.usuarioAlta
        };

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_TABLE_NEW'
        });

        axios.post(EndpointsConstants.URI_SECURITY_FACULTY_REGISTER, facultadAdd, config).then((response) => {

                if (response.data.successful && __.size(response.data.payload)>0) {
                let facAdd={
                        'nombre':facultad.nombre,
                        'codigoFacultad': facultad.codigoFacultad,
                        'descripcion': facultad.descripcion,
                        'estatus': "A",
                        "modulo":{"nombre":facultad.nombreModulo,"codigoModulo":facultad.modulo.codigoModulo},
                        'tipoFacultad': facultad.tipoFacultad,
                        'url': menu.url
                    };
                    response.data.payload.url=menu.url;
                    data.push(response.data.payload);
                    if (data.length>10){
                        data.splice( 0, 1 );
                    }
                    dispatch({
                        type: 'TABLE_NEW',
                        payload: data
                    });
                    Notification.show({
                        "message": "Nuevo registro de facultad creado con éxito",
                        "type": "success"
                    });
                    if (facultad.tipoFacultad==="FPANT"){

                        axios.post(EndpointsConstants.URI_SECURITY_ADD_MENU, menu, config).then((response) => {
                            if (response.data.successful && __.size(response.data.payload)>0) {

                                axios.post(EndpointsConstants.URI_SECURITY_ADD_FACULTADMENU, facultadMenu, config).then((response) => {


                                },
                                (error) => {
                                    Notification.show({
                                        "message": "Por favor levante un ticket con la clave: "+error.response.data.traceId,
                                        "type": "error"
                                    });
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
export function consultaMenuPrincipal(modulo){

    return (dispatch) => {

        let codigoModulo={"codigoModulo":modulo};
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_FACULTADMENU, codigoModulo, config).then((response) => {

                if (response.data.successful && __.size(response.data.payload)>=0) {

                        dispatch({
                            type: 'CAT_PRINCIPAL',
                            payload: response.data.payload
                        });

                }else {
                    console.log("response",response);
                }

            },
            (error) => {
                Notification.show({
                    "message": error.response.data.traceId,
                    "type": "error"
                });
            });
    }

};
export function consultaMenus(menu,nivel){

    return (dispatch) => {


        let codigoMenu={"codigoMenu": menu};
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_FACULTADMENU, codigoMenu, config).then((response) => {

                if (response.data.successful && __.size(response.data.payload)>=0) {
                    if (nivel==="levelTwo"){

                        dispatch({
                            type: 'CAT_LEVELTWO',
                            payload: response.data.payload
                        });
                    }
                    if (nivel==="levelTree"){

                        dispatch({
                            type: 'CAT_LEVELTREE',
                            payload: response.data.payload
                        });
                    }
                }else {
                    console.log("response",response);
                }

            },
            (error) => {
                Notification.show({
                    "message": error.response.data.traceId,
                    "type": "error"
                });
            });
    }

};
export function deleteActiveFacultad(srtArgs,data,positions){

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_ALTA_BAJA_FACULTAD, srtArgs, config).then((response) => {

                if (response.data.successful && typeof (response.data.payload) ==="object") {

                    let mensaje="", mensajeError="", mensajeAccion=(srtArgs.estatus==="I")?"Baja":"Alta", mensajeAccion1=(srtArgs.estatus==="I")?"baja":"alta";
                    if (positions.length===1){

                        mensaje=mensajeAccion+" de facultad "+data[positions].nombre+ " realizada correctamente";
                        mensajeError="La facultad "+data[positions].nombre+" no se ha dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
                    }else if (positions.length>1){

                        mensaje=response.data.payload.correctos+" facultades se han dado de "+mensajeAccion1+" correctamente";
                        mensajeError=response.data.payload.incorrectos+" facultades no se han dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
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
export function deleteFacultadNew(srtArgs, data){

    return (dispatch) => {

        const params = {
            'codigosFacultades': srtArgs.codigosFacultades,
            "usuarioUltimaModificacion": srtArgs.usuarioUltimaModificacion,
            "estatus": srtArgs.estatus
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_ALTA_BAJA_FACULTAD, params, config).then((response) => {

                if (response.data.successful && typeof (response.data.payload) ==="object") {

                    let mensaje="", mensajeError="";
                    if (srtArgs.positions.length===1){

                        mensaje="Baja de facultad "+data[srtArgs.positions].nombre+ " realizada correctamente";
                        mensajeError="La facultad "+data[srtArgs.positions].nombre+" no se ha dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
                    }else if (srtArgs.positions.length>1){

                        mensaje=response.data.payload.correctos+" facultades se han dado de baja correctamente";
                        mensajeError=response.data.payload.incorrectos+" facultades no se han dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
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
export function updateFacultad(srtArgs, objeto, data, menu){

    return (dispatch) => {

        let params={
                "codigoFacultad" : srtArgs.codigoFacultad,
                "descripcion" : srtArgs.descripcion,
                "nombre" : srtArgs.nombre,
                "modulo":{"codigoModulo":srtArgs.modulo.codigoModulo},
                "tipoFacultad" : srtArgs.tipoFacultad,
                "usuarioUltimaModificacion" : srtArgs.usuarioUltimaModificacion
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_FACULTAD, params, config).then((response) => {

                if (response.data.successful && response.data.payload === 1) {

                    data[objeto.index].descripcion=srtArgs.descripcion;
                    data[objeto.index].nombre=srtArgs.nombre;
                    data[objeto.index].nombreModulo=srtArgs.nombreModulo;
                    data[objeto.index].modulo.codigoModulo=srtArgs.modulo.codigoModulo;
                    data[objeto.index].modulo.descripcion=srtArgs.nombreModulo;
                    data[objeto.index].modulo.nombre=srtArgs.nombreModulo;
                    data[objeto.index].tipoFacultad=srtArgs.tipoFacultad;
                    data[objeto.index].usuarioUltimaModificacion=srtArgs.usuarioUltimaModificacion;

                    dispatch({
                        type: 'RESET_TABLE'
                    });
                    dispatch({
                        type: 'FACULTADESCONSULTA_FILTRO',
                        payload: data,
                    });
                    Notification.show({
                        "message": "La facultad "+data[objeto.index].nombre+ " ha sido actualizada exitosamente",
                        "type": "success"
                    });
                    //////
                    if (srtArgs.tipoFacultad==="FPANT") {
                        if (menu.codigoMenu!==""){
                            axios.post(EndpointsConstants.URI_SECURITY_UPDATE_MENU_FACULTAD, menu, config).then((response) => {

                                    if (response.data.successful && response.data.payload === 1) {
                                        data[objeto.index].menu = {};
                                        data[objeto.index].menu.codigoModulo = srtArgs.modulo.codigoModulo;
                                        data[objeto.index].menu.codigoMenu = menu.codigoMenu;
                                        data[objeto.index].menu.nombre = menu.nombre;
                                        data[objeto.index].menu.descripcion = menu.nombre;
                                        data[objeto.index].menu.codigoPadre = menu.codigoPadre;
                                        data[objeto.index].menu.url = menu.url;
                                        data[objeto.index].url = menu.url;
                                        data[objeto.index].menu.usuarioUltimaModificacion = menu.usuarioUltimaModificacion;

                                        arbolMenu({"codigoFacultad": srtArgs.codigoFacultad});

                                        dispatch({
                                            type: 'RESET_TABLE_NEW'
                                        });
                                        dispatch({
                                            type: 'TABLE_NEW',
                                            payload: data,
                                        });

                                    } else {
                                        console.log("response", response);
                                    }

                                },
                                (error) => {

                                    Notification.show({
                                        "message": "Por favor levante un ticket con la clave:" + error.response.data.traceId,
                                        "type": "error"
                                    });
                                });
                        }else{

                            let addMenu={
                                "codigoMenu": srtArgs.codigoFacultad,
                                "descripcion":menu.nombre,
                                "codigoModulo": srtArgs.modulo.codigoModulo,
                                "nombre": menu.nombre,
                                "url" : menu.url,
                                "usuarioAlta":srtArgs.usuarioUltimaModificacion,
                                "codigoPadre" : ""
                            };
                            let facultadMenu={
                                "codigoMenu": srtArgs.codigoFacultad,
                                "codigoFacultad": srtArgs.codigoFacultad,
                                "usuarioAlta":srtArgs.usuarioUltimaModificacion
                            };
                            axios.post(EndpointsConstants.URI_SECURITY_ADD_MENU, addMenu, config).then((response) => {
                                    if (response.data.successful && __.size(response.data.payload)>0) {

                                        axios.post(EndpointsConstants.URI_SECURITY_ADD_FACULTADMENU, facultadMenu, config).then((response) => {


                                            },
                                            (error) => {
                                                Notification.show({
                                                    "message": "Por favor levante un ticket con la clave: "+error.response.data.traceId,
                                                    "type": "error"
                                                });
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
                    }
                    // //

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
export function updateFacultadNew(srtArgs, objeto, data, menu){

    return (dispatch) => {

        let params={
                "codigoFacultad" : srtArgs.codigoFacultad,
                "descripcion" : srtArgs.descripcion,
                "nombre" : srtArgs.nombre,
                "modulo":{"codigoModulo":srtArgs.modulo.codigoModulo},
                "tipoFacultad" : srtArgs.tipoFacultad,
                "usuarioUltimaModificacion" : srtArgs.usuarioUltimaModificacion
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_FACULTAD, params, config).then((response) => {

                if (response.data.successful && response.data.payload === 1) {

                    data[objeto.index].descripcion = srtArgs.descripcion;
                    data[objeto.index].nombre = srtArgs.nombre;
                    data[objeto.index].nombreModulo = srtArgs.nombreModulo;
                    data[objeto.index].modulo.codigoModulo = srtArgs.modulo.codigoModulo;
                    data[objeto.index].modulo.descripcion = srtArgs.nombreModulo;
                    data[objeto.index].modulo.nombre = srtArgs.nombreModulo;
                    data[objeto.index].tipoFacultad = srtArgs.tipoFacultad;
                    data[objeto.index].usuarioUltimaModificacion = srtArgs.usuarioUltimaModificacion;

                    dispatch({
                        type: 'RESET_TABLE_NEW'
                    });
                    dispatch({
                        type: 'TABLE_NEW',
                        payload: data,
                    });
                    Notification.show({
                        "message": "La facultad " + data[objeto.index].nombre + " ha sido actualizada exitosamente",
                        "type": "success"
                    });
                    //////
                    if (srtArgs.tipoFacultad==="FPANT") {
                        if (menu.codigoMenu!==""){
                            axios.post(EndpointsConstants.URI_SECURITY_UPDATE_MENU_FACULTAD, menu, config).then((response) => {

                                    if (response.data.successful && response.data.payload === 1) {
                                        data[objeto.index].menu = {};
                                        data[objeto.index].menu.codigoModulo = srtArgs.modulo.codigoModulo;
                                        data[objeto.index].menu.codigoMenu = menu.codigoMenu;
                                        data[objeto.index].menu.nombre = menu.nombre;
                                        data[objeto.index].menu.descripcion = menu.nombre;
                                        data[objeto.index].menu.codigoPadre = menu.codigoPadre;
                                        data[objeto.index].menu.url = menu.url;
                                        data[objeto.index].url = menu.url;
                                        data[objeto.index].menu.usuarioUltimaModificacion = menu.usuarioUltimaModificacion;

                                        arbolMenu({"codigoFacultad": srtArgs.codigoFacultad});

                                        dispatch({
                                            type: 'RESET_TABLE_NEW'
                                        });
                                        dispatch({
                                            type: 'TABLE_NEW',
                                            payload: data,
                                        });

                                    } else {
                                        console.log("response", response);
                                    }

                                },
                                (error) => {

                                Notification.show({
                                    "message": "Por favor levante un ticket con la clave:" + error.response.data.traceId,
                                    "type": "error"
                                });
                            });
                        }else{
                            menu.codigoMenu=srtArgs.codigoFacultad;
                            let addMenu={
                                "codigoMenu": srtArgs.codigoFacultad,
                                "codigoPadre" : "",
                                "codigoFacultad": srtArgs.codigoFacultad,
                                "usuarioAlta":srtArgs.usuarioUltimaModificacion,
                                "descripcion":menu.nombre,
                                "codigoModulo": srtArgs.modulo.codigoModulo,
                                "nombre": menu.nombre,
                                "url" : menu.url
                            };
                            let facultadMenu={
                                "codigoMenu": srtArgs.codigoFacultad,
                                "codigoFacultad": srtArgs.codigoFacultad,
                                "usuarioAlta":srtArgs.usuarioUltimaModificacion
                            };
                            axios.post(EndpointsConstants.URI_SECURITY_ADD_MENU, addMenu, config).then((response) => {
                                    if (response.data.successful && __.size(response.data.payload)>0) {

                                        axios.post(EndpointsConstants.URI_SECURITY_ADD_FACULTADMENU, facultadMenu, config).then((response) => {


                                            },
                                            (error) => {
                                                Notification.show({
                                                    "message": "Por favor levante un ticket con la clave: "+error.response.data.traceId,
                                                    "type": "error"
                                                });
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
                    }
                    // //

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