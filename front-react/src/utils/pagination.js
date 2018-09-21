import _ from 'lodash';

export default {
    /**
     * Obtain items based on page
     * @Param {arrayOfObjects, number} token
     */
     getPaginatedItems(type, items, per_page=10, page=1) {
        const offset = (page -1) * per_page;
        // const paginatedItems = _.rest(items, offset).slice(0, per_page); //this is for underscore
        let paginatedItems = _(items).drop(offset).take(per_page).value();
        _.each(paginatedItems, (element, index) => {

            let today = '';
            //console.log("element",element);
            
            if(element.fechaHoraAlta!=""||!_.isUndefined(element.fechaHoraAlta)){
                today = new Date(element.fechaHoraAlta);
                let dd = today.getDate();
                let mm = today.getMonth()+1; 

                let yyyy = today.getFullYear();
                if(dd<10){
                    dd='0'+dd;
                } 
                if(mm<10){
                    mm='0'+mm;
                } 
                today = dd+'/'+mm+'/'+yyyy;
            }
            
            switch( type ) {
                case 'reassignment':
                case 'meetings':                
                    paginatedItems[index].fechaHoraAlta = today;
                break;
            }
        });


        return {
            page: page,
            per_page: per_page,
            total: items.length,
            total_pages: Math.ceil(items.length / per_page),
            data: paginatedItems
        }
    }

}
