export const generaCatalogo = (catalogo = []) => {

    if (catalogo.length === 0) {

        return [];

    }

    return catalogo.map((entidad) => {


        return entidad &&

            {
                textKey: entidad.nombre,
                valueKey: entidad.nombre
            };

    });

};
export const generaData = (data = [], opcion="") => {

    let dataGenerado=[]
    if (data.length === 0) {

        return dataGenerado;

    }

    data.map((entidad) => {
        let tipoFacultad="";
        switch (entidad.tipoFacultad){
            case 'FPANT':
                tipoFacultad="Menú";
                break;
            case 'FBTN':
                tipoFacultad="Botón";
                break;
            default:
                tipoFacultad=entidad.tipoFacultad;
        }

        entidad.nombreModulo=entidad.modulo.nombre;
        entidad.tipoFacultad=tipoFacultad;
        entidad.estatus= (entidad.estatus==="A"||entidad.estatus==="ACTIVO")?"ACTIVO":"INACTIVO";
        if (opcion===""){
            entidad.url=(entidad.menu!==null)?entidad.menu.url:"";
        };

        dataGenerado.push(entidad);
    });

    return dataGenerado;

};