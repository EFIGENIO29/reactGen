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