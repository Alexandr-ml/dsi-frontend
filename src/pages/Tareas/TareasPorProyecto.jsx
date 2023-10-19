import react, {useEffect, useState} from 'react'
import {CircularProgress, Grid, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {useNavigate, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import serverUrl from "../../serverUrl.js";
import listaMisTareas from "./ListaMisTareas.jsx";
import TareasTable from "../../Componentes/TareasTable.jsx";
import TareasTablePorProyecto from "../../Componentes/TareasTablePorProyecto.jsx";



function TareasPorProyecto(){

    const {id} = useParams()

    const headers = new Headers()
    headers.set("x-token", sessionStorage.getItem("token"))

    const initGetTareas = {
        headers:headers,
        method:'GET',
    }




    let [tareas,setTareas] = useState()

    const [tareasNoIniciadas,setTareasNoIniciadas] = useState()
    const [tareasEnProgreso,setTareasEnProgreso] = useState()
    const [tareasFinalizadas,setTareasFinalizadas] = useState()


    const [nombreProyecto,setNombreProyecto] = useState()
    let navigate = useNavigate()

    const actualizarTareas = (tareas) => {
        setTareas(tareas)

        let tareasNoIniciadasAux = tareas.filter(valor => valor.estado_Tarea === 'No iniciado')
        let tareasFinalizadasAux = tareas.filter(valor => valor.estado_Tarea === 'Finalizado')
        let tareasEnProgresoAux = tareas.filter(valor => valor.estado_Tarea === 'En proceso')


        setTareasEnProgreso(tareasEnProgresoAux)
        setTareasNoIniciadas(tareasNoIniciadasAux)
        setTareasFinalizadas(tareasFinalizadasAux)
    }

    useEffect(() => {
        fetch(serverUrl+`/api/tareas/listadoTareas/${id}`,initGetTareas)
            .then(raw => raw.json())
            .then(respuesta => {

                const tareas =  respuesta.tareas
                actualizarTareas(tareas)

            })

        fetch(serverUrl+`/api/proyectos/${id}`,initGetTareas)
            .then(raw => raw.json())
            .then(body => {
                console.log(body)
                setNombreProyecto(body.resto._doc.nombre)}
            )
    }, []);

    let [tabSeleccionada,setTabSeleccionada] = useState(0)

    const handleTabChanged = (event,value) => {
        //console.log(event)
        //console.log(value)

        setTabSeleccionada(value)
    }

    const setTab = (valor)=>{

        switch (valor){
            case 0:
                return <TareasTablePorProyecto listaTareas={tareasNoIniciadas} actualizarTareas={actualizarTareas} proyecto={id}/>
            case 1:
                return <TareasTablePorProyecto listaTareas={tareasEnProgreso} actualizarTareas={actualizarTareas} proyecto={id}/>
            case 2:
                return <TareasTablePorProyecto listaTareas={tareasFinalizadas} actualizarTareas={actualizarTareas} proyecto={id}/>
            default:
                return <></>
        }

    }

    return <>
        <Grid container alignItems={'center'}  className={'mb-4'}>
            <Grid item xs={8}>
                <Typography variant={'h3'}>{nombreProyecto}</Typography>
            </Grid >
            <Grid item xs={4} >
                <Button
                    onClick={()=> navigate('/mistareas/tarea')}
                    variant={'contained'}
                    endIcon={<Add/>}>Nueva tarea</Button>
            </Grid>
        </Grid>


        <Container>

            {
                tareas?<> <Tabs value={tabSeleccionada} onChange={handleTabChanged}>
                        <Tab label={'No iniciadas.'} value={0}/>
                        <Tab label={'En progreso.'} value={1}/>
                        <Tab label={'Finalizadas.'} value={2}/>
                    </Tabs>

                        {setTab(tabSeleccionada)}
                    </>

                    : <div align={'center'}><CircularProgress/></div>
            }

        </Container>


    </>
}



export default TareasPorProyecto;