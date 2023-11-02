import React, {useEffect, useState} from 'react';
import adminProy from './adminProy.jsx';

export const ConsultaApi = () => {


    const [con, setConsulta] = useState(null);

    const consultar = async (id) => {
        console.log('ConsultaApi');

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