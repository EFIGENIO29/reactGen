import axios from 'axios';

import _ from 'lodash';
import * as EndpointsConstants from 'constants/endpoints';                          
import Notification from 'components/base/generic/Notifications/Notification';

//import PaginationUtils from 'utils/pagination';


export function resetTable(){
    return (dispatch) => {
          dispatch({
            type: 'RESET_LEADS_STATE',
            payload: []
        });
      
    }    
}

export function asignedDND(D1,D2){
    return (dispatch) => {
          dispatch({
            type: 'DND_PROFILES',
            payload: [D1,D2]
        });
      
    }    
}
export function ResetAsignedDND(){
    return (dispatch) => {
          dispatch({
            type: 'RESET_PROFILES'
        });
      
    }    
}


export function consultaPerfiles(srtArgs) {    
    return (dispatch) => {        
        
        let params = {};
        if((srtArgs.codigoPerfil !="") && (srtArgs.descripcion !="")){
            params = {
                'codigoPerfil': srtArgs.codigoPerfil,
                'nombre': srtArgs.descripcion,
                'estatus':(srtArgs.estatus==="A")?"A":"I"
            };
        } else if((srtArgs.codigoPerfil=="") && (srtArgs.descripcion!="")){
            params = {                
                'nombre': srtArgs.descripcion,
                'estatus':(srtArgs.estatus==="A")?"A":"I"
            };
        } else if((srtArgs.codigoPerfil!="") && (srtArgs.descripcion=="")){
            params = {                
                'codigoPerfil': srtArgs.codigoPerfil,
                'estatus':(srtArgs.estatus==="A")?"A":"I"
            };
        }else{
            params = {                                
                'estatus':(srtArgs.estatus==="A")?"A":"I"
            };
        }
        
        
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'RESET_LEADS_STATE',
            payload: []
        });

        axios.post(EndpointsConstants.URI_SECURITY_PROFILE_CONSULT, params, config).then((response) => {

            if (response.data.successful && _.size(response.data.payload) > 0) {                

                dispatch({ 
                    type: 'PERFILESCONSULTA_DATA',
                    payload: response.data.payload,
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

export function requestChangeIndex(value) {
    return {
        type: 'CHANGE_INDEX',
        payload: value
    };
}

export function updateObject(value) {
    return {

        type: 'UPDATE_OBJETO',
        payload: value
    };
}

export function resetProfileFaculties() {
    return {

        type: 'RESET_PROFILE_FACULTYS_CONSULT',
            payload: []
    };
}
export function updateFacultiesDND(profileFaculties,listDND2) {   

    return (dispatch) => {                

        let finalDND = [];
        finalDND.push(profileFaculties[0]);
        finalDND.push(listDND2);        
        
        dispatch({
            type: 'RESET_PROFILE_FACULTYS_CONSULT'
        }); 
        dispatch({ 
            type: 'UPDATE_PROFILE_FACULTYS_CONSULT',
            payload: finalDND
        });       
        
    }
}

 
export function searchProfilesFaculties(srtArgs,catFaculties){
    
    return (dispatch) => {        
        //console.log("ACTION searchProfilesFaculties",srtArgs);
        const params = {
            'codigoPerfil': srtArgs.codigoPerfil
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        
        dispatch({
            type: 'RESET_PROFILE_FACULTYS_CONSULT'
        });
        if(srtArgs.codigoPerfil!=""){
            axios.post(EndpointsConstants.URI_SECURITY_PROFILE_FACULTYS_CONSULT, params, config).then((response) => {
                

                if (response.data.successful && _.size(response.data.payload) > 0) {                            

                    let param_DND1 = [];
                    let param_DND2 = [];
                    let facultiesListAssigned = [];
                    let param_DND1Order = [];
                    let param_DND1Filter = [];
                    
                    param_DND1 = catFaculties;
                    param_DND2 = response.data.payload;                   
                    if(param_DND2.facultades.length > 0){ 
                        if(param_DND2.facultades){
                                
                            if(param_DND2.facultades.length > 0){  
                                param_DND1.map((key, idx) => {            
                                    param_DND1[idx].exists=false;                   
                                });   
                                param_DND1.map((key, idx) => {            
                                    param_DND2.facultades.map((k, i) => {                                                     
                                        if(key.id.trim() == k.codigoFacultad.trim() && k.estatus.trim() == 'A'){                                                                                                                   
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
                                    param_DND2.facultades.map((k, i) => {                             
                                        if(key.id.trim() == k.codigoFacultad.trim() && k.estatus.trim() == 'I'){                                                                                                                   
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
                                param_DND2.facultades.map((k, i) => {                                                                            
                                
                                    if(k.estatus=='A'){
                                        let arr = {
                                            exists:false,
                                            id:k.codigoFacultad.toUpperCase(),
                                            text:k.descripcion.toUpperCase(),
                                            modulo:k.modulo['descripcion'].toUpperCase()     
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
                        type: 'UPDATE_PROFILE_FACULTYS_CONSULT',
                        payload: finalDND
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
        }else{
            console.log("no hizo llamada:",srtArgs.codigoPerfil);
        }
        
    }
    
}





export function actualizaPerfiles(srtArgs,idx,obj){
    
    return (dispatch) => {        
        //console.log(srtArgs);
        const params = {
            'codigoPerfil': obj.codigoPerfil,
            'nombre': obj.nombre,
            'descripcion': obj.descripcion,
            "estatus": (obj.estatus==="ACTIVO")?"A":"I",
            "usuarioUltimaModificacion":"core"
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        /*dispatch({
            type: 'RESET_ELEMENTS_STATE',
            payload: []
        });*/        
        axios.post(EndpointsConstants.URI_SECURITY_PROFILE_UPDATE, params, config).then((response) => {

            if (response.data.successful && response.data.payload == 1) {
                let tmpDatas = [];
                
                
              // this.props.dispatch(ActionsSearchPerfiles.updateObject(obj)); 

                dispatch({
                    type: 'UPDATE_OBJETO',
                    payload: obj
                });

                consultaPerfiles({
                    'codigoPerfil': srtArgs.codigoPerfil,
                    'nombre': srtArgs.nombre,
                    'estatus':srtArgs.estatus
                });
                
                 Notification.show({
                    "message": "El perfil fue actualizado exitosamente",
                    "type": "success"
                });

                
            }else {
                Notification.show({
                    "message": "Por favor levante un ticket con la clave: "+error.response.data.traceId,
                    "type": "error"
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




export function actualizaPerfilesFacultades(srtArgs,objFaculties){
    
    return (dispatch) => {        
        
        let faculties = [];
        objFaculties.map((k, i) => {

            faculties.push({"codigoFacultad":k.id})
        })
        
        const params = {
            'codigoPerfil': srtArgs.codigoPerfil,
            "usuarioAlta":"core",
            'facultades': faculties,
            
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };        
        axios.post(EndpointsConstants.URI_SECURITY_PROFILE_FACULTYS_REGISTER, params, config).then((response) => {
            
            if (response.data.successful && response.data.payload.correctos > 0) {                                        
               
                Notification.show({
                    "message": "Las Facultades has sido actualizadas exitosamente",
                    "type": "success"
                });
                
            }else {
                Notification.show({
                    "message": "Las Facultades no fueron actualizadas. Por favor levante un ticket con la clave: "+error.response.data.traceId,
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
    
}




export function updateProfile(srtArgs,data,positions){
    
    return (dispatch) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(EndpointsConstants.URI_SECURITY_PROFILES_UPDATE, srtArgs, config).then((response) => {

            if (response.data.successful == true && _.size(response.data.payload) > 0) {    

                let mensaje="", mensajeError="", mensajeAccion=(srtArgs.estatus==="I")?"Baja":"Alta", mensajeAccion1=(srtArgs.estatus==="I")?"baja":"alta";
                if (positions.length===1){

                    mensaje=mensajeAccion+" de perfil "+data[positions].nombre+ " realizada correctamente";
                    mensajeError="El perfil "+data[positions].nombre+" no se ha dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
                }else if (positions.length>1){

                    mensaje=response.data.payload.correctos+" perfiles se han dado de "+mensajeAccion1+" correctamente";
                    mensajeError=response.data.payload.incorrectos+" perfiles no se han dado de "+mensajeAccion1+". Por favor levante un ticket con la clave:"+response.data.traceId;
                }
                let control=0;
                positions.map((entidad)=> {


                    data.splice( entidad-control, 1 );
                    control++;
                });

                dispatch({
                    type: 'PERFILESCONSULTA_DATA',
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
    
}
