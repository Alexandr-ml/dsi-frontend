import React, {useEffect, useState} from 'react';
import adminProy from './adminProy.jsx';

const ConsultaApi = () => {


    const [con, setConsulta] = useState(null);

    const consultar = async (id) => {

        const token = sessionStorage.getItem('token');
        try {
            const {data} = await adminProy.get(
                '/proyectos/pro/'+id,
                {
                    headers: {
                        'Content-Type': '/application/json',
                        'x-token': token,
                    },
                },
            );
            setConsulta(data);

        } catch (error) {
            console.log('error', error, 'token', token);
        }
    };

    return {con,consultar};
};

const ConsultaApiProyecto = () => {
    const [con, setConsulta] = useState(null);

    const consultar = async (id) => {
        const token = sessionStorage.getItem('token');
        try {
            const { data } = await adminProy.get(
                '/tareas/listadoTareas/' + id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': token,
                    },
                }
            );
            setConsulta(data);
        } catch (error) {
            console.log('error', error, 'token', token);
        }
    };

    return { con, consultar };
};



export { ConsultaApi, ConsultaApiProyecto};