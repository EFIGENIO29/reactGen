import {toastr} from "react-redux-toastr";
import exito from 'material-ui/svg-icons/av/playlist-add'

/**
 * @description Servicio que ejecuta el evento para que el componente dispare
 * la acción al reducer.
 * Este es una recuadro flotante para mostrar al usuario mensajes
 */
export default class Notification {

    constructor() {

    }

    /**
     * @description Acción que ejecutará el evento del toastr para mostrar
     * las notificaciones al usuario. El toastr default es de tipo info.
     * Las opciones son: success, warning, error, info.
     * @param {{message: string, type: string}} data:
     * @return {void}
     */
    static show(data) {

        const {message, type = "info"} = data;

        switch (type) {

            case "success":
                toastr.success("", message);
                break;

            case "warning":
                toastr.warning("", message);
                break;

            case "error":
                toastr.error("Error", message, {progressBar: false,   timeOut: 0});
                break;

            case "info":
            default:
                toastr.info("", message);
                break;

        }

    }

    static error(message) {

        toastr.error("Error", message);

    }

    static success(message) {

        toastr.error("Success", message);

    }

}