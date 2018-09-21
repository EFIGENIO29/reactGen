/**
 * @function Update Find Drag and Drop
 * @param object text
 * @return {object} 
 */
export function findFilterDND(obj,catFaculties) {    
    return (dispatch) => {        
        if(obj!=""){
            let filtroFacultades = [];
            catFaculties.map((item, child) => {        
                if(item.text.indexOf(obj.toUpperCase())>0){
                    filtroFacultades.push(item);
                }
            });
           /* dispatch({
                type: 'RESET_STATE_DND_FILTER',
                payload: filtroFacultades
            });            */
            //debugger;
            dispatch({
                type: 'UPDATE_DND_FILTER',
                payload: filtroFacultades
            });
        }else{     
            let filtroFacultades = [];
            /*dispatch({
                type: 'RESET_STATE_DND_FILTER',
                payload: filtroFacultades
            });    */
            dispatch({
                type: 'UPDATE_DND_FILTER',
                payload: catFaculties
            });
        }
    } 
    
}


 
 