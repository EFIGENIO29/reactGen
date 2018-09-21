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
export function catEmpresa() {

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_EMPRESAS, {}, config).then((response) => {

                dispatch({
                    type: 'CATEMPRESAS_DATA',
                    payload: response.data.payload,
                });
            },
            (error) => {
                console.log(error);
            });

    }
};
export function catSucursales(srtArgs) {
    let params = "";
    if(srtArgs!=""){
        params = srtArgs;
    }

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        
        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_SUCURSALES, params, config).then((response) => {

                dispatch({
                    type: 'CATSUCURSALES_DATA',
                    payload: response.data.payload,
                });
            },
            (error) => {
                console.log(error);
            });

    }
};
export function resetSucursal(){
    return (dispatch) => {
        dispatch({
            type: 'RESET_CATSUCURSALES_DATA'
        });

    }
};
export function consultaUsuarios(srtArgs) {
    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_TABLE'
        });

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_USERS, srtArgs, config).then((response) => {

                dispatch({
                    type: 'USUARIOSCONSULTA_FILTRO',
                    payload: response.data.payload,
                });
        },
        (error) => {
            Notification.show({
                "message": "Por favor levante un ticket con la clave: "+error.response.data.traceId,
                "type": "error"
            });
        });

    }
};
export function agregarUser(srtArgs, data) {
    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_USER_RECORD, srtArgs, config).then((response) => {

                if (response.data.successful && typeof (response.data.payload)==="object") {
                    let claveUsuario=response.data.payload.claveUsuario;
                    axios.post(EndpointsConstants.URI_SECURITY_CONSULT_USERS, {"claveUsuario":claveUsuario}, config).then((response1) => {
                        if (response1.data.successful &&  __.size(response1.data.payload)>0) {

                            data.push(response1.data.payload[0]);
                            if (data.length>10){
                                data.splice( 0, 1 );
                            }
                            dispatch({
                                type: 'RESET_TABLE_NEW'
                            });
                            dispatch({
                                type: 'TABLE_NEW',
                                payload: data,
                            });
                        }else{
                            Notification.show({
                                "message": "Usuario por autorizar",
                                "type": "info"
                            });
                        }
                    },
                    (error) => {
                        console.log(error);
                    });
                    Notification.show({
                        "message": "Nuevo registro de usuario creado con éxito",
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
export function deleteActiveUsers(srtArgs,data,positions){

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_ALTA_BAJA_USUARIOS, srtArgs, config).then((response) => {

                if (response.data.successful && typeof (response.data.payload) ==="object") {

                    let mensaje="", mensajeError="", mensajeAccion=(srtArgs.estatus==="I")?"Baja":"Alta", mensajeAccion1=(srtArgs.estatus==="I")?"baja":"alta";
                    if (positions.length===1){

                        mensaje=mensajeAccion+" de usuario "+data[positions].nombre+ " realizada correctamente";
                        mensajeError="El usuario "+data[positions].nombre+" no se ha dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
                    }else if (positions.length>1){

                        mensaje=response.data.payload.correctos+" usuarios se han dado de "+mensajeAccion1+" correctamente";
                        mensajeError=response.data.payload.incorrectos+" usuarios no se han dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
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
export function deleteUsersNew(srtArgs, data){

    return (dispatch) => {

        const params = {
            'clavesUsuarios': srtArgs.clavesUsuarios,
            "usuarioUltimaModificacion": srtArgs.usuarioUltimaModificacion,
            "estatus": srtArgs.estatus
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_ALTA_BAJA_USUARIOS, params, config).then((response) => {

                if (response.data.successful && typeof (response.data.payload) ==="object") {

                    let mensaje="", mensajeError="";
                    if (srtArgs.positions.length===1){

                        mensaje="Baja del usuario "+data[srtArgs.positions].nombre+ " realizada correctamente";
                        mensajeError="El usuario "+data[srtArgs.positions].nombre+" no se ha dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
                    }else if (srtArgs.positions.length>1){

                        mensaje=response.data.payload.correctos+" usuarios se han dado de baja correctamente";
                        mensajeError=response.data.payload.incorrectos+" usuarios no se han dado de baja. Por favor levante un ticket con la clave:"+response.data.traceId;
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
export function updateUser(srtArgs, objeto, data){

    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_USUARIOS, srtArgs, config).then((response) => {

                if (response.data.successful && response.data.payload === 1) {

                    data[objeto.index].claveUsuario=srtArgs.claveUsuario;
                    data[objeto.index].idPersona=srtArgs.idPersona;
                    data[objeto.index].email=srtArgs.email;
                    data[objeto.index].usuarioUltimaModificacion=srtArgs.usuarioUltimaModificacion;

                    dispatch({
                        type: 'RESET_TABLE'
                    });
                    dispatch({
                        type: 'USUARIOSCONSULTA_FILTRO',
                        payload: data,
                    });
                    Notification.show({
                        "message": "El usuario "+data[objeto.index].nombre+ " ha sido actualizado exitosamente",
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
export function updateUserNew(srtArgs, objeto, data){

    return (dispatch) => {
        
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_USUARIOS, srtArgs, config).then((response) => {

                if (response.data.successful && response.data.payload === 1) {

                    data[objeto.index].claveUsuario=srtArgs.claveUsuario;
                    data[objeto.index].idPersona=srtArgs.idPersona;
                    data[objeto.index].email=srtArgs.email;
                    data[objeto.index].usuarioUltimaModificacion=srtArgs.usuarioUltimaModificacion;

                    dispatch({
                        type: 'RESET_TABLE_NEW'
                    });
                    dispatch({
                        type: 'TABLE_NEW',
                        payload: data,
                    });
                    Notification.show({
                        "message": "El usuario " + data[objeto.index].nombre + " ha sido actualizado exitosamente",
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

export function requestChangeIndex(value) {
    return {
        type: 'CHANGE_INDEX',
        payload: value
    };
}
export function ResetAsignedDND(){
    return (dispatch) => {
          dispatch({
            type: 'RESET_PROFILES'
        });
      
    }    
}


export function searchUserProfiles(catProfiles,usrProfile){
    
        return (dispatch) => {
            const params = {
                'claveUsuario': usrProfile
            };
            
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            };
    
            axios.post(EndpointsConstants.URI_SECURITY_CONSULT_USER_PROFILES, params, config).then((response) => {
                
                    if ( response.data.successful && __.size(response.data.payload) > 0 ) {                        
                           
                        let param_DND1 = [];
                        let param_DND2 = [];
                        let profilesListAssigned = [];
                        let param_DND1Order = [];
                        let param_DND1Filter = [];
                        
                        param_DND1 = catProfiles;
                        param_DND2 = response.data.payload;                   
                        if(param_DND2.length > 0){ 
                            if(param_DND2){
                                    
                                if(param_DND2.length > 0){  
                                    param_DND1.map((key, idx) => {            
                                        param_DND1[idx].exists=false;                   
                                    });   
                                    param_DND1.map((key, idx) => {            
                                        param_DND2.map((k, i) => {                                                                                                 
                                            
                                            if(key.id.trim() == k.codigoPerfil.trim() && k.estatus.trim() == 'A'){                                                                                                                   
                                                param_DND1[idx].exists=true;                  
                                            }
                                        });   
                                    });   
                                    
                                                           
                                    param_DND1.map((i,j) =>{                    
                                        if(i.exists==false){
                                            param_DND1Filter.push(i);
                                        }
                                    })                
                                    param_DND1Filter.map((key, idx) => {
                                        param_DND1Filter[idx].exists=false;                                      
                                    }); 
                                    param_DND1Filter.map((key, idx) => {                    
                                        param_DND2.map((k, i) => {                                                                       
                                            if(key.id.trim() == k.codigoPerfil.trim() && k.estatus.trim() == 'I'){                                                                                                                   
                                                param_DND1Filter[idx].exists=true;                  
                                            }                                 
                                        });   
                                    });  
                                                    
                                    param_DND1Filter.map((i,j) =>{
                                        if(i.exists==true){
                                            param_DND1Order.push(i);
                                        }
                                    })                
                                    param_DND1Filter.map((i,j) =>{
                                        if(i.exists==false){
                                            param_DND1Order.push(i);
                                        }
                                    })
                                    param_DND2.map((k, i) => {                                                                            
                                    
                                        if(k.estatus=='A'){
                                            let arr = {
                                                exists:false,
                                                id:k.codigoPerfil.toUpperCase(),
                                                text:k.descripcion.toUpperCase(),
                                                modulo:k.nombre.toUpperCase()     
                                            }  
    
                                            profilesListAssigned.push(arr);
                                        }
                                    });
                                       
                                    
                                }
                            }
                        }
                        else{
                            param_DND1.map((i,j) =>{                                                
                                param_DND1Filter.push(i);                            
                            })                
                            param_DND1Filter.map((key, idx) => {
                                param_DND1Filter[idx].exists=false;                                      
                            });                         
                            param_DND1Filter.map((i,j) =>{                            
                                param_DND1Order.push(i);                            
                            })                                        
                        }

                        let finalDND = [];
                        finalDND.push(param_DND1Order);
                        finalDND.push(profilesListAssigned);
                       
                        dispatch({ 
                            type: 'UPDATE_USER_PROFILES_CONSULT',
                            payload: finalDND
                        });
                        /*
                        ------------------------------------------------------------------
                        */
    
                    }else {

                        let param_DND1 = [];
                        let param_DND2 = [];
                        let profilesListAssigned = [];
                        let param_DND1Order = [];
                        let param_DND1Filter = [];
                        
                        param_DND1 = catProfiles;                        
                        
                        param_DND1.map((i,j) =>{                                                
                            param_DND1Filter.push(i);                            
                        })                
                        param_DND1Filter.map((key, idx) => {
                            param_DND1Filter[idx].exists=false;                                      
                        });                         
                        param_DND1Filter.map((i,j) =>{                            
                            param_DND1Order.push(i);                            
                        })                                        
                        

                        let finalDND = [];
                        finalDND.push(param_DND1Order);
                        finalDND.push(profilesListAssigned);
                       
                        dispatch({ 
                            type: 'UPDATE_USER_PROFILES_CONSULT',
                            payload: finalDND
                        });
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

export function searchUserProfilesUS(claveUsuario){

    return (dispatch) => {
        const params = {
            'claveUsuario': claveUsuario
        };
        
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_USER_PROFILES, params, config).then((response) => {
                
                if ( response.data.successful && __.size(response.data.payload) > 0 ) {                        
                    
                    /*
                    dispatch({ 
                        type: 'UPDATE_USER_PROFILES_CONSULT_US',
                        payload: response.data.payload
                    });       
                    */
                    //debugger
                    dispatch(searchUserFacultiesUS(claveUsuario,response.data.payload));

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
export function searchUserFacultiesUS(claveUsuario,usrProfilesUS){

    return (dispatch) => {
        const params = {
            'claveUsuario': claveUsuario
        };
        
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        
        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_USER_FACULTIES, params, config).then((response) => {
                
                //console.log("URI_SECURITY_CONSULT_USER_FACULTIES",response.data);
                if ( response.data.successful && __.size(response.data.payload) > 0 ) {                        
                    
                    console.log("URI_SECURITY_CONSULT_USER_FACULTIES",usrProfilesUS,response.data.payload)
                    
                    let finaldataTable = [];
                        /*finaldataTable.push(usrProfilesUS);
                        finaldataTable.push(response.data.payload);  */
                    usrProfilesUS.map((k, idx) => {                            
                        if(((k.codigoPerfil!==null)||(k.codigoPerfil!=="null"))&&((k.nombre!==null)||(k.nombre!=="null"))&&((k.descripcion!==null)||(k.descripcion!=="null"))){
                            
                            let arr = {
                                Nombre:k.nombre.toUpperCase(),
                                Codigo:k.codigoPerfil.toUpperCase(),
                                Descripcion:k.descripcion.toUpperCase(),
                                Tipo:'PERFIL',                            
                                Empresa: 'Ninguna',
                                Sucursal: 'Ninguna'
                            }  
                            finaldataTable.push(arr);                                    
                        }    
                    });
                    
                    response.data.payload.map((i, idx) => {                            
                        if(i.codigoFacultad!==null&&i.nombre!==null&&i.descripcion!==null){
                            
                            let arr1 = {
                                Nombre:i.nombre.toUpperCase(),
                                Codigo:i.codigoFacultad.toUpperCase(),
                                Descripcion:i.descripcion.toUpperCase(),
                                Tipo:'FACULTAD',                            
                                Empresa: 'Ninguna',
                                Sucursal: 'Ninguna'
                            }  
                            finaldataTable.push(arr1);                                    
                        }
                    });    
                    dispatch({ 
                        type: 'UPDATE_USER_DTSUC',
                        payload: finaldataTable
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
    
    export function ResetUserAsignedDND(){
        return (dispatch) => {
              dispatch({
                type: 'RESET_UPDATE_USER_PROFILES_CONSULT'
            });
          
        }    
    }

    export function updateUserProfilesDND(profileFaculties,listDND2) {   
        
            return (dispatch) => {                
        
                let finalDND = [];
                finalDND.push(profileFaculties[0]);
                finalDND.push(listDND2);        
                
                dispatch({
                    type: 'RESET_USER_FACULTIES_CONSULT'
                }); 
                dispatch({ 
                    type: 'UPDATE_USER_FACULTIES_CONSULT',
                    payload: finalDND
                });       
                
            }
        }
 

        
export function actualizausuarioPerfiles(srtArgs, objPerfiles, user){
    
    return (dispatch) => {

        let perfiles = [];
        objPerfiles.map((k, i) => {
            perfiles.push({"codigoPerfil":k.id})
        })
        
        const params = {
            'claveUsuario': srtArgs.claveUsuario,
            "usuarioAlta": user,
            'perfiles': perfiles            
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_USER_PROFILES, params, config).then((response) => {

                if (response.data.successful && response.data.payload.correctos > 0) {                                        
                    
                    Notification.show({
                        "message": "Perfil(es) asignado(s) con éxito",
                        "type": "success"
                    });
                    
                }else {
                    Notification.show({
                        "message": "Los Perfiles no fueron asignados. Por favor levante un ticket con la clave: "+response.data.traceId,
                        "type": "error"
                    });
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

export function actualizaUsuarioFacultades(srtArgs, objPerfiles, user){
    
    return (dispatch) => {

        let facultades = [];
        objPerfiles.map((k, i) => {
            facultades.push({"codigoFacultad":k.id})
        })
        console.log("actualizaUsuarioFacultades",srtArgs, objPerfiles, user)
        const params = {
            'claveUsuario': srtArgs.claveUsuario,
            "usuarioAlta": user,
            'facultades': facultades            
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        axios.post(EndpointsConstants.URI_SECURITY_UPDATE_USER_FACULTIES, params, config).then((response) => {

                if (response.data.successful && response.data.payload.correctos > 0) {                                        
                    
                    Notification.show({
                        "message": "Facultad(es) asignado(s) con éxito",
                        "type": "success"
                    });
                    
                }else {
                    Notification.show({
                        "message": "Las Facultades no fueron asignadas. Por favor levante un ticket con la clave: "+response.data.traceId,
                        "type": "error"
                    });
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

export function searchUserFaculties(obFacultades,user){
    
    return (dispatch) => {        
        //console.log("ACTION searchProfilesFaculties",srtArgs);
        const params = {
            'claveUsuario': user
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        
        dispatch({
            type: 'RESET_USER_FACULTIES_CONSULT'
        });
      
        axios.post(EndpointsConstants.URI_SECURITY_CONSULT_USER_FACULTIES, params, config).then((response) => {
            
            
            if (response.data.successful && _.size(response.data.payload) > 0) {                            
                
                let param_DND1 = [];
                let param_DND2 = [];
                let facultiesListAssigned = [];
                let param_DND1Order = [];
                let param_DND1Filter = [];
                
                param_DND1 = obFacultades;
                param_DND2 = response.data.payload;                   
                if(param_DND2.length > 0){ 
                    if(param_DND2){
                            
                        if(param_DND2.length > 0){  
                            param_DND1.map((key, idx) => {            
                                param_DND1[idx].exists=false;                   
                            });   
                            param_DND1.map((key, idx) => {            
                                param_DND2.map((k, i) => {         
                                    if(k.codigoFacultad!==null){
                                        if(key.id.trim() == k.codigoFacultad.trim() && k.estatus.trim() == 'A'){                                                                                                                   
                                            param_DND1[idx].exists=true;                  
                                        }                           
                                    }      
                                });   
                            });                            
                            param_DND1.map((i,j) =>{                    
                                if(i.exists==false){
                                    param_DND1Filter.push(i);
                                }
                            })                
                            param_DND1Filter.map((key, idx) => {
                                param_DND1Filter[idx].exists=false;                                      
                            }); 
                            param_DND1Filter.map((key, idx) => {                    
                                param_DND2.map((k, i) => {                             
                                    if(k.codigoFacultad!==null){
                                        if(key.id.trim() == k.codigoFacultad.trim() && k.estatus.trim() == 'I'){                                                                                                                   
                                            param_DND1Filter[idx].exists=true;                  
                                        }  
                                    }                               
                                });   
                            });                     
                            param_DND1Filter.map((i,j) =>{
                                if(i.exists==true){
                                    param_DND1Order.push(i);
                                }
                            })                
                            param_DND1Filter.map((i,j) =>{
                                if(i.exists==false){
                                    param_DND1Order.push(i);
                                }
                            })
                            param_DND2.map((k, i) => {    
                                let mod = ''
                                
                                if(k.modulo != null){
                                    mod = k.modulo['descripcion'].toUpperCase()     
                                }else{
                                    mod = '';
                                }                                                                        
                            
                                if(k.estatus=='A'){
                                    let arr = {
                                        exists:false,
                                        id:k.codigoFacultad.toUpperCase(),
                                        text:k.descripcion.toUpperCase(),                                        
                                        modulo:mod
                                    }  

                                    facultiesListAssigned.push(arr);
                                }
                            });

                            
                        }
                    }
                }else{
                    param_DND1.map((i,j) =>{                                                
                        param_DND1Filter.push(i);                            
                    })                
                    param_DND1Filter.map((key, idx) => {
                        param_DND1Filter[idx].exists=false;                                      
                    });                         
                    param_DND1Filter.map((i,j) =>{                            
                        param_DND1Order.push(i);                            
                    })                                        
                }
                
                let finalDND = [];
                finalDND.push(param_DND1Order);
                finalDND.push(facultiesListAssigned);
                
                dispatch({ 
                    type: 'UPDATE_USER_FACULTIES_CONSULT',
                    payload: finalDND
                });
                
            }else {
                let param_DND1 = [];
                let param_DND2 = [];
                let facultiesListAssigned = [];
                let param_DND1Order = [];
                let param_DND1Filter = [];
                
                param_DND1 = obFacultades;                

                param_DND1.map((i,j) =>{                                                
                    param_DND1Filter.push(i);                            
                })                
                param_DND1Filter.map((key, idx) => {
                    param_DND1Filter[idx].exists=false;                                      
                });                         
                param_DND1Filter.map((i,j) =>{                            
                    param_DND1Order.push(i);                            
                })                                        
                 
                
                let finalDND = [];
                finalDND.push(param_DND1Order);
                finalDND.push(facultiesListAssigned);
                
                dispatch({ 
                    type: 'UPDATE_USER_FACULTIES_CONSULT',
                    payload: finalDND
                });
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

export function updateUserFacultiesDND(profileFaculties,listDND2) {   
    
        return (dispatch) => {                
    
            let finalDND = [];
            finalDND.push(profileFaculties[0]);
            finalDND.push(listDND2);        
            
            dispatch({
                type: 'RESET_USER_FACULTIES_CONSULT'
            }); 
            dispatch({ 
                type: 'UPDATE_USER_FACULTIES_CONSULT',
                payload: finalDND
            });       
            
        }
    }   