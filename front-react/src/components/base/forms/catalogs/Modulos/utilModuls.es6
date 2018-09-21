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
export const generaData = (data = []) => {
    let dataGenerado=[]
    if (data.length === 0) {

        return dataGenerado;

    }

    data.map((entidad) => {

        entidad.estatus= (entidad.estatus==="A"||entidad.estatus==="ACTIVO")?"ACTIVO":"INACTIVO";

        dataGenerado.push(entidad);
    });

    return dataGenerado;

};