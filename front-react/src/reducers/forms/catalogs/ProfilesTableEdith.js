const initialState = {
  data: [],  
  clients_filtered: null,
  clients_in_page: null,
  page: null,
  per_page: null,
  total: null,
  total_pages: null

};

/**
 * @desc Leads reducer
 */
 export default function reducer(state=initialState, action) {
    switch(action.type) {
        case 'PROSPECTOS' : {
            return {...state, 
                data: action.payload,
                clients_filtered: action.payload,
                clients_in_page: action.payload,
                total_pages: null,
                prospectos:action.payload
            };
        }
        case 'PROSPECTOSPAGINACION' : {
            return {...state, 
                page: action.payload.page,
                per_page: action.payload.per_page,
                total: action.payload.items.length,
                total_pages: action.payload.total_pages
            };
        }
        case 'CITAS' : {
            return {...state, 
                data: action.payload,
            };
        }        
        //inicia
        case 'RESET_LEADS_STATE' : {
            return {...state,                 
                data: initialState.data,  
                clients_filtered: initialState.clients_filtered,
                clients_in_page: initialState.clients_in_page,
                page: initialState.page,
                per_page: initialState.per_page,
                total: initialState.total,
                total_pages: initialState.total_pages
            };
        }

    }
    return state;        
}
