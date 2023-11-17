import react, { useEffect, useState } from 'react'
import { CircularProgress, Grid, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import serverUrl from "../../serverUrl.js";
import listaMisTareas from "./ListaMisTareas.jsx";
import TareasTable from "../../Componentes/TareasTable.jsx";
import TareasTableUn from "../../Componentes/TareasTableUn.jsx"
import Loading from '../../Componentes/Loading.jsx';



function MisTareas() {

    var id = localStorage.getItem("uid")
    const headers = new Headers()
    headers.set("x-token", sessionStorage.getItem("token"))

    const initGetTareas = {
        headers: headers,
        method: 'GET',
    }


    let [tareas, setTareas] = useState([])
    let [proyectos, setProyectos] = useState([])

    const [tareasNoIniciadas, setTareasNoIniciadas] = useState()
    const [tareasEnProgreso, setTareasEnProgreso] = useState()
    const [tareasFinalizadas, setTareasFinalizadas] = useState()
    const [misTareasNoIni, setMisTareasNoIni] = useState([])
    const [misTareasProgre, setMisTareasProgre] = useState([])
    const [misTareasFin, setMisTareasFin] = useState([])
    const [tareasFiltradas, setTareasFiltradas] = useState([])


    const actualizarTareas = (tareas) => {
        console.log(tareas)
        let tareasFiltradas = tareas.filter(valor => valor.asignados.nombre === localStorage.getItem("nombreUsuario"))
        let misTareasNoIniciadasAux = tareasFiltradas.filter(valor => valor.estado_Tarea === 'No iniciado')
        let misTareasFinalizadasAux = tareasFiltradas.filter(valor => valor.estado_Tarea === 'Finalizado')
        let misTareasEnProgresoAux = tareasFiltradas.filter(valor => valor.estado_Tarea === 'En proceso')
        setMisTareasNoIni(misTareasNoIniciadasAux)
        setMisTareasProgre(misTareasEnProgresoAux)
        setMisTareasFin(misTareasFinalizadasAux)
        console.log(tareasFiltradas)
    }

    useEffect(() => {
        fetch(serverUrl + `/api/tareas`, initGetTareas)
            .then(raw => raw.json())
            .then(respuesta => {
                const tareas = respuesta.tareas
                setTareas(tareas)
                actualizarTareas(tareas)

            })
        fetch(serverUrl + '/api/proyectos/creador/' + id, initGetTareas)
            .then(rawResponse => rawResponse.json())
            .then((response) => {
                const proyectos = response.proyectos
                setProyectos(proyectos)
                console.log(proyectos)
            })

    }, []);

    useEffect(() => {
        if (proyectos || tareas) {
            let idsProyectos = proyectos.map(proyecto => proyecto.uid);
            let tareasFiltrada = tareas.filter(tarea => idsProyectos.includes(tarea.proyecto._id));
            setTareasFiltradas(tareasFiltrada);

            const estadoTareasMap = {
                'No iniciado': setTareasNoIniciadas,
                'Finalizado': setTareasFinalizadas,
                'En proceso': setTareasEnProgreso
            };

            Object.keys(estadoTareasMap).forEach(estado => {
                let tareasPorEstado = tareasFiltrada.filter(tarea => tarea.estado_Tarea === estado);
                estadoTareasMap[estado](tareasPorEstado);
            });
        }
    }, [tareas, proyectos]);

    let [tabSeleccionada, setTabSeleccionada] = useState(0)
    let [miTabSelec, setMiTabSelec] = useState(0)

    const handleTabChanged = (event, value) => {
        setTabSeleccionada(value)
    }

    const handleMiTabChanged = (event, value) => {
        setMiTabSelec(value)
    }

    const tareasMap = {
        0: tareasNoIniciadas,
        1: tareasEnProgreso,
        2: tareasFinalizadas
    }

    const setTab = (valor) => {
        return <TareasTable listaTareas={tareasMap[valor]} actualizarTareas={actualizarTareas} />
    }

    const misTareasMap = {
        0: misTareasNoIni,
        1: misTareasProgre,
        2: misTareasFin
    };

    const setMisTab = (valor) => {
        return <TareasTableUn listaTareas={misTareasMap[valor]} actualizarTareas={actualizarTareas} />
    }

    return <>
        {tareasNoIniciadas && misTareasNoIni ? <>
            <Grid container alignItems={'center'} className={'mb-4'}>
                <Grid item xs={12} align='center' md={12}>
                    <Typography variant={'h3'}>Tareas</Typography>
                </Grid >
            </Grid>
            <Container>
                {
                    tareasNoIniciadas ? <> <Tabs value={tabSeleccionada} onChange={handleTabChanged}>
                        <Tab style={{ color: '#214A87' }} label={'No iniciadas'} value={0} />
                        <Tab style={{ color: '#214A87' }} label={'En progreso'} value={1} />
                        <Tab style={{ color: '#214A87' }} label={'Finalizadas'} value={2} />
                    </Tabs>
                        {setTab(tabSeleccionada)}
                    </>
                        : <Loading />
                }
            </Container>
            <br></br>
            <Typography variant={'h3'}>Tareas Asignadas</Typography>
            <Container>
                {
                    misTareasNoIni ? <> <Tabs value={miTabSelec} onChange={handleMiTabChanged}>
                        <Tab label={'No iniciadas'} value={0} />
                        <Tab label={'En progreso'} value={1} />
                        <Tab label={'Finalizadas'} value={2} />
                    </Tabs>
                        {setMisTab(miTabSelec)}
                    </>
                        : <div align={'center'}><Loading/></div>
                }
            </Container>
        </> : <Loading />}
    </>
}

export default MisTareas;