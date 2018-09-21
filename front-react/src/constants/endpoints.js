let IP = '';
let PORT = '';
// Only the development enviroment
switch(process.env.NODE_ENV) {
    case 'production':
    case 'testing':
        //IP = '130.211.238.203';
        IP = '130.211.223.112';        
        //IP = '10.1.44.176';
        PORT = '8182';
        break;
    case 'development':
        // Desarrollo
        IP = '10.1.44.86';
        PORT = '8182';

        // Arturo
        // IP = '192.168.252.217';
        // PORT = '8182';
        // Antonio
        // IP = '192.168.253.215';
        // PORT = '8181';

        break;
}
/** Login: Employees */
export const URI_LOGIN_EMPLOYEES = 'http://'+IP+':'+PORT+'/cxf/empleados/rest';// Antonio
/** Login: Employees > Find Active */
export const URI_LOGIN_EMPLOYEES_SEARCH_ACTIVE = URI_LOGIN_EMPLOYEES + '/buscarActivos';
/** Login: Security */
export const URI_LOGIN_SECURITY = 'http://'+IP+':'+PORT+'/cxf/seguridad';
// Antonio
/** Login: Security > Consult Users */
export const URI_LOGIN_SECURITY_CONSULT_USER_EMAIL = URI_LOGIN_SECURITY + '/autorizacion/consultarUsuarioEmail';
export const URI_LOGIN_SECURITY_CONSULT_USERS = URI_LOGIN_SECURITY + '/autorizacion/consultarUsuarios';
/** Login: Security > Authorization > Record Access Log */
export const URI_LOGIN_SECURITY_AUTHORIZATION_RECORD_ACCESS_LOG = URI_LOGIN_SECURITY + '/autorizacion/registrarBitacoraAcceso';
/** Login: Security > Authorization > Get Access Log */
export const URI_LOGIN_SECURITY_AUTHORIZATION_GET_ACCESS_LOG = URI_LOGIN_SECURITY + '/autorizacion/consultarBitacoraAcceso';
/** Menu: Consult */
export const URI_MENU_CONSULT = URI_LOGIN_SECURITY + '/autorizacion/consultarMenusUsuario';
/** Seguridad: Facultad ->register*/
export const URI_SECURITY_FACULTY_REGISTER = URI_LOGIN_SECURITY + '/autorizacion/registrarFacultad';
/** Seguridad: Facultad ->update*/
export const URI_SECURITY_FACULTY_UPDATE = URI_LOGIN_SECURITY + '/autorizacion/actualizarFacultad';
/** Seguridad: Facultad ->Consult*/
export const URI_SECURITY_FACULTY_CONSULT = URI_LOGIN_SECURITY + '/autorizacion/consultarFacultadesUrl';
/** Seguridad: Perfil ->register*/
export const URI_SECURITY_PROFILE_REGISTER = URI_LOGIN_SECURITY + '/autorizacion/registrarPerfil';
/** Seguridad: Perfil ->update*/
export const URI_SECURITY_PROFILE_UPDATE = URI_LOGIN_SECURITY + '/autorizacion/actualizarPerfil';
/** Seguridad: Perfil ->update*/
export const URI_SECURITY_PROFILES_UPDATE = URI_LOGIN_SECURITY + '/autorizacion/actualizarPerfiles';

/** Seguridad: Perfil ->Consult*/
export const URI_SECURITY_PROFILE_CONSULT = URI_LOGIN_SECURITY + '/autorizacion/consultarPerfiles';
/** Seguridad: Perfil ->Consult*/
export const URI_SECURITY_PROFILE_FACULTYS_CONSULT = URI_LOGIN_SECURITY + '/autorizacion/consultarPerfilFacultades';
/** Seguridad: Facultades - Perfil ->register*/
export const URI_SECURITY_PROFILE_FACULTYS_REGISTER = URI_LOGIN_SECURITY + '/autorizacion/asignarFacultadesPerfil';
/** Seguridad: USER ->RECORD*/
export const URI_SECURITY_USER_RECORD = URI_LOGIN_SECURITY + '/autorizacion/registrarUsuario';
/** Seguridad: USER ->update*/
export const URI_SECURITY_USER_UPDATE = URI_LOGIN_SECURITY + '/autorizacion/actualizarUsuario';

export const URI_SECURITY_CONSULT_MODULOS = URI_LOGIN_SECURITY + '/autorizacion/consultarModulos';

export const URI_SECURITY_UPDATE_MODULO = URI_LOGIN_SECURITY + '/autorizacion/actualizarModulo';

export const URI_SECURITY_BAJA_ALTA_MODULOS = URI_LOGIN_SECURITY + '/autorizacion/actualizarModulos';

export const URI_SECURITY_ADD_MODULO = URI_LOGIN_SECURITY + '/autorizacion/registrarModulo';

export const URI_SECURITY_ADD_MENU = URI_LOGIN_SECURITY + '/autorizacion/registrarMenu';

export const URI_SECURITY_ADD_FACULTADMENU = URI_LOGIN_SECURITY + '/autorizacion/registrarFacultadMenu';

export const URI_SECURITY_CONSULT_FACULTADMENU = URI_LOGIN_SECURITY + '/autorizacion/consultarComboMenus';

export const URI_SECURITY_CONSULT_ARBOL_MENU = URI_LOGIN_SECURITY + '/autorizacion/consultarFacultadArbolMenus';

export const URI_SECURITY_CONSULT_ALTA_BAJA_FACULTAD = URI_LOGIN_SECURITY + '/autorizacion/actualizarFacultades';

export const URI_SECURITY_UPDATE_FACULTAD = URI_LOGIN_SECURITY + '/autorizacion/actualizarFacultad';

export const URI_SECURITY_UPDATE_MENU_FACULTAD = URI_LOGIN_SECURITY + '/autorizacion/actualizarMenu';

export const URI_SECURITY_CONSULT_USERS = URI_LOGIN_SECURITY + '/autorizacion/consultarUsuariosDetalle';

export const URI_SECURITY_CONSULT_EMPRESAS = URI_LOGIN_SECURITY + '/autorizacion/consultarEmpresas';

export const URI_SECURITY_CONSULT_SUCURSALES = URI_LOGIN_SECURITY + '/autorizacion/consultarSucursal';

export const URI_SECURITY_UPDATE_ALTA_BAJA_USUARIOS = URI_LOGIN_SECURITY + '/autorizacion/actualizarUsuarios';

export const URI_SECURITY_UPDATE_USUARIOS = URI_LOGIN_SECURITY + '/autorizacion/actualizarUsuario';

export const URI_SECURITY_CONSULT_USER_PROFILES = URI_LOGIN_SECURITY + '/autorizacion/consultarPerfilesActivosUsuario';

export const URI_SECURITY_UPDATE_USER_PROFILES = URI_LOGIN_SECURITY + '/autorizacion/asignarPerfilesUsuario';

export const URI_SECURITY_CONSULT_USER_FACULTIES = URI_LOGIN_SECURITY + '/autorizacion/consultarFacultadesActivasUsuario';

export const URI_SECURITY_UPDATE_USER_FACULTIES = URI_LOGIN_SECURITY + '/autorizacion/asignarFacultadesUsuario';


export const URI_RIF_EMPLOYEES = 'http://www.rif.independencia.com.mx/';