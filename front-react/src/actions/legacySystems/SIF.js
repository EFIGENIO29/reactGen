/**
 * 
 */
import axios from 'axios';

export function requestLogin(data) {
    return (dispatch) => {
        let url = 'http://10.1.44.110:7011/OtorgamientoCreditoWeb/rest/login/validarPerfilUsuario';
        let params = {
            'claveEmpresa': data.empresa,
            'claveUsuario': data.usuario,
            'contrasenia': data.password
        };
        axios.get(url, params).then(
            (response) => {
                dispatch({
                    type: 'TODO',
                    payload: response
                });
            },
            (error) => {
                dispatch({
                    type: 'TODO',
                    payload: error
                });
            }
        );
    };
}
