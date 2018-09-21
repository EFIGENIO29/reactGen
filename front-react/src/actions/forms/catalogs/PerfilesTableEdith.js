/*
import axios from 'axios';
import _ from 'underscore';
import * as EndpointsConstants from 'constants/endpoints';
import * as DialogsActions from 'actions/common/dialogs';
import PaginationUtils from 'utils/pagination';
import PaginationUtilsBitacora from 'utils/paginatedBitacora';

export function requestBitacoraFormiik() {
    return (dispatch) => {      
        const params = {};
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        dispatch({
            type: 'BITACORA',
            payload: []
        });

        dispatch({
            type: 'FILTRO',
            payload: []
        });

        
    }
}
export function requestProspectosRenovacion(periodo, division, supervisor, asesor, correspondent, estatus) {
    return (dispatch) => {
        division = (!_.isUndefined(division)) ? division : null;
        supervisor = (!_.isUndefined(supervisor)) ? supervisor : null;
        asesor = (!_.isUndefined(asesor)) ? asesor : null;
        correspondent = (!_.isUndefined(correspondent)) ? correspondent : null;
        estatus = (!_.isUndefined(estatus)) ? estatus : null;
        const params = {
            'idProspecto': {
            'periodo': periodo            },
            'division': division,
            'personaAsesor': asesor,
            'personaSupervisor': supervisor,
            'nombreCorresponsal': correspondent,
            'estatusCarga': estatus
        };
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };

        dispatch({
            type: 'PROSPECTOS',
            payload: []
        });

        dispatch({
            type: 'FILTRO',
            payload: []
        });

        axios.post(EndpointsConstants.URI_PROSPECTOS_RENOVACION_SERVICES, params, config)
            .then((response) => {

                    if (response.data.successful && _.size(response.data.payload) > 0
                    ) {
                        dispatch(DialogsActions.updateDialogProgressOpen(false));
                        let rows = PaginationUtils.getPaginatedItems('meetings', response.data.payload, 10, 1);

                        dispatch({
                            type: 'PROSPECTOS',
                            payload: response.data.payload
                        });
                        dispatch({
                            type: 'FILTRO',
                            payload: rows
                        });
                    }
                    else {
                        dispatch(DialogsActions.updateDialogProgressOpen(false));
                        dispatch(DialogsActions.updateSuccessTitle('Aviso'));
                        dispatch(DialogsActions.updateSuccessMsg('No hay prospectos disponibles'));
                        dispatch(DialogsActions.updateSuccessOpen(true));


                    }

                },
                (error) => {
                    dispatch(DialogsActions.updateDialogProgressOpen(false));
                    dispatch(DialogsActions.updateErrorTitle('Error'));
                    dispatch(DialogsActions.updateErrorMsg('Ha ocurrido un error :' + error));
                    dispatch(DialogsActions.updateErrorOpen(true));
                }
            )
        ;
    }
}
*/