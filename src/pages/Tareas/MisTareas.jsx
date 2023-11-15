import react, {useEffect, useState} from 'react'
import {CircularProgress, Grid, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import serverUrl from "../../serverUrl.js";
import listaMisTareas from "./ListaMisTareas.jsx";
import TareasTable from "../../Componentes/TareasTable.jsx";
import TareasTableUn from "../../Componentes/TareasTableUn.jsx"
import Loading from '../../Componentes/Loading.jsx';



function MisTareas(){

    var id = localStorage.getItem("uid")
    const headers = new Headers()
    headers.set("x-token", sessionStorage.getItem("token"))

    const initGetTareas = {
        headers:headers,
        method:'GET',
    }


    let [tareas,setTareas] = useState([])
    let [proyectos, setProyectos] = useState([])

    const [tareasNoIniciadas,setTareasNoIniciadas] = useState()
    const [tareasEnProgreso,setTareasEnProgreso] = useState()
    const [tareasFinalizadas,setTareasFinalizadas] = useState()
    const [misTareasNoIni, setMisTareasNoIni] = useState([])
    const [misTareasProgre, setMisTareasProgre] = useState([])
    const [misTareasFin, setMisTareasFin] = useState([])

    const [tareasFiltradas, setTareasFiltradas] = useState([])
    let navigate = useNavigate()

    const actualizarTareas = (tareas) => {
        console.log(tareas)
        let tareasFiltradas = tareas.filter(valor => valor.asignados.nombre ===localStorage.getItem("nombreUsuario"))
        let misTareasNoIniciadasAux = tareasFiltradas.filter(valor => valor.estado_Tarea === 'No iniciado')
        let misTareasFinalizadasAux = tareasFiltradas.filter(valor => valor.estado_Tarea === 'Finalizado')
        let misTareasEnProgresoAux = tareasFiltradas.filter(valor => valor.estado_Tarea === 'En proceso')
        setMisTareasNoIni(misTareasNoIniciadasAux)
        setMisTareasProgre(misTareasEnProgresoAux)
        setMisTareasFin(misTareasFinalizadasAux)
        console.log(tareasFiltradas)
    }

    useEffect(() => {
        fetch(serverUrl+`/api/tareas`,initGetTareas)
            .then(raw => raw.json())
            .then(respuesta => {

                const tareas =  respuesta.tareas
                setTareas(tareas)
                actualizarTareas(tareas)

            })
        fetch(serverUrl + '/api/proyectos/creador/'+id, initGetTareas)
        .then(rawResponse => rawResponse.json())
            .then((response) => {
                const proyectos = response.proyectos
                setProyectos(proyectos)
                console.log(proyectos)
            })
        
    }, []);

    useEffect(()=>{
        if(proyectos || tareas){
        let idsProyectos = proyectos.map(proyecto => proyecto.uid)
        let tareasFiltrada = tareas.filter(tarea => idsProyectos.includes(tarea.proyecto._id))
        setTareasFiltradas(tareasFiltrada)
        let tareasNoIniciadasAux = tareasFiltrada.filter(valor => valor.estado_Tarea === 'No iniciado')
        let tareasFinalizadasAux = tareasFiltrada.filter(valor => valor.estado_Tarea === 'Finalizado')
        let tareasEnProgresoAux = tareasFiltrada.filter(valor => valor.estado_Tarea === 'En proceso')
        setTareasEnProgreso(tareasEnProgresoAux)
        setTareasNoIniciadas(tareasNoIniciadasAux)
        setTareasFinalizadas(tareasFinalizadasAux)
    }
    }, [tareas, proyectos])

    let [tabSeleccionada,setTabSeleccionada] = useState(0)
    let [miTabSelec, setMiTabSelec] = useState(0)

    const handleTabChanged = (event,value) => {
        //console.log(event)
        //console.log(value)

        setTabSeleccionada(value)

    }

    const handleMiTabChanged = (event,value) => {
        //console.log(event)
        //console.log(value)

        setMiTabSelec(value)

    }

    const setTab = (valor)=>{

        switch (valor){
            case 0:
                return <TareasTable listaTareas={tareasNoIniciadas} actualizarTareas={actualizarTareas} />
            case 1:
                return <TareasTable listaTareas={tareasEnProgreso} actualizarTareas={actualizarTareas}/>
            case 2:
                return <TareasTable listaTareas={tareasFinalizadas} actualizarTareas={actualizarTareas}/>
            default:
                return <></>
        }

    }

    const setMisTab = (valor)=>{

        switch (valor){
            case 0:
                return <TareasTableUn listaTareas={misTareasNoIni} actualizarTareas={actualizarTareas} />
            case 1:
                return <TareasTableUn listaTareas={misTareasProgre} actualizarTareas={actualizarTareas}/>
            case 2:
                return <TareasTableUn listaTareas={misTareasFin} actualizarTareas={actualizarTareas}/>
            default:
                return <></>
        }
    }

    return <>
        <Grid container alignItems={'center'}  className={'mb-4'}>
            <Grid item xs={8}>
                <Typography variant={'h3'}>Tareas</Typography>
            </Grid >
            <Grid item xs={4} justifyContent={'right'} display={'flex'}>
                <Button
                    onClick={()=> navigate('/mistareas/tarea')}
                    variant={'contained'}
                    endIcon={<Add/>}>Nueva tarea</Button>
            </Grid>
        </Grid>

        <Container>

            {
                tareasNoIniciadas?<> <Tabs value={tabSeleccionada} onChange={handleTabChanged}>
                        <Tab style={{color:'#214A87'}} label={'No iniciadas'} value={0}/>
                        <Tab style={{color:'#214A87'}}label={'En progreso'} value={1}/>
                        <Tab style={{color:'#214A87'}}label={'Finalizadas'} value={2}/>
                    </Tabs>

                        {setTab(tabSeleccionada)}
                    </>

                    : <Loading/>
            }

        </Container>

        <br></br>
        <Typography variant={'h3'}>Tareas Asignadas</Typography>
        <Container>

            {
                misTareasNoIni?<> <Tabs value={miTabSelec} onChange={handleMiTabChanged}>
                            <Tab label={'No iniciadas'} value={0}/>
                            <Tab label={'En progreso'} value={1}/>
                            <Tab label={'Finalizadas'} value={2}/>
                        </Tabs>

                    {setMisTab(miTabSelec)}
                    </>

                    : <div align={'center'}><CircularProgress/></div>
            }

        </Container>


    </>
}



export default MisTareas;