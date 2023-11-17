import react, { useEffect, useState } from 'react'
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Badge,
    Chip,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Skeleton,
    styled, TextField
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import tareaReducer from "../../js/tareaReducer.js"
import { useNavigate } from 'react-router-dom';
import { Circle } from "@mui/icons-material"
import { ta } from 'date-fns/locale';
import { set } from 'date-fns';
import url from "../../serverUrl.js";

function CrearTarea() {
    //********************************//
    //****DECLARACIÓN DE VARIABLES****//
    //********************************//
    let initialState = {}
    let navigate = useNavigate()
    const { id } = useParams()
    const [tarea, setTarea] = useState()
    const [usuarios, setUsuarios] = useState([])
    const [proyectos, setListaProyectos] = useState([])
    const [options, setOptions] = useState()
    let [hasProjects, setHasProjects] = useState(true)
    const [agregarAsignado, setAgregarAsignado] = useState(true)
    const [buscandoAsignado, setBuscandoAsignado] = useState(false)
    const [newProject, setNewProject] = useState()
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false)
    const [formatoAsignado, setFormatoAsignado] = useState()
    const [asignados, setAsignados] = useState([])
    const [errorFormatoAsignado, setErrorFormatoAsignado] = useState(false)
    const [emailAsignado, setEmailAsignado] = useState(null)
    const [project, setProject] = useState(null)
    const [tareaCreada, setTareaCreada] = useState(false)
    const [tareaModifica, setTareaModificada] = useState(false)

    //*********************//
    //****CONSULTAS API****//
    //*********************//
    useEffect(() => {

        const header = new Headers
        header.set("x-token", sessionStorage.getItem("token"))

        const initGetProyecto = {
            headers: header,
            method: "GET",
        }

        setTarea({
            nombre: "",
            descripcion: "",
            estado_Tarea: "No iniciado",
            create_date: dayjs(new Date()),
            ending_date: "",
            proyecto: id,
            asignados: ""
        })

        fetch(url + '/api/proyectos/' + id, initGetProyecto)
            .then(raw => raw.json())
            .then(response => {
                setUsuarios(response.resto._doc.colaboradores)
            })
    }, []);


    //*****************//
    //****FUNCIONES****//
    //*****************//


    const handleTareaNameChange = (e) => {
        const valor = e.target.value
        const changeInTarea = tareaReducer(tarea, { type: "SET_NOMBRE_TAREA", payload: valor })
        setTarea(changeInTarea)
    }

    const handleTareaDescrChange = (e) => {
        const valor = e.target.value
        const changeInTarea = tareaReducer(tarea, { type: "SET_DESCRIPCION", payload: valor })
        setTarea(changeInTarea)
    }

    const handleTareaEstadoChange = (e) => {
        const valor = e.target.value
        const changeInTarea = tareaReducer(tarea, { type: "SET_ESTADO_TAREA", payload: valor })
        setTarea(changeInTarea)
    }

    const handleStartDateChange = (valor, context) => {
        const changeInTarea = tareaReducer(tarea, { type: "SET_FECHA_CREACION", payload: valor })
        setTarea(changeInTarea)

    }

    const handleEndDateChange = (valor, context) => {
        const changeInTarea = tareaReducer(tarea, { type: "SET_FECHA_FINALIZACION", payload: valor })
        setTarea(changeInTarea)

    }

    const handleAgregarAsignado = (e) => {
        const changeInTarea = tareaReducer(tarea, { type: "SET_COLABORADORES", payload: e })
        setTarea(changeInTarea)
        console.log(changeInTarea)
    }

    const handleModalTareaCreated = () => {
        setTareaCreada(true)
        history.back()
    }

    //**************//
    //****RENDER****//
    //**************//
    let loading = (id && !tarea)

    return <>

        {
            loading ?

                <>


                    <div>
                        <div className={'d-flex justify-content-center'}>
                            <Typography variant={'h3'}>Cargando...</Typography>
                        </div>

                    </div>
                    <div>
                        <div className={'d-flex justify-content-center'}>
                            <CircularProgress />
                        </div>
                    </div>
                </>

                :
                <div>
                    {usuarios ?
                        < Container >

                            {
                                project && usuarios ?
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant={'h3'} className={'mb-4'}>Tarea</Typography>
                                        <Typography variant='h5' className='mb-4' style={{ marginLeft: '5%' }}>Proyecto: {project.nombre}</Typography>
                                    </div>
                                    : <div>
                                        <Typography variant={'h3'} className={'mb-4'}>Tarea</Typography>

                                    </div>}
                            <Grid container alignItems={'center'} style={{ display: 'flex' }} spacing={4} className={'mb-4'}>
                                <Grid item xs={12} >

                                    <TextField
                                        required
                                        value={tarea ? tarea.nombre : ''}
                                        hiddenLabel={tarea ? true : false}
                                        label={'Nombre de la tarea'}
                                        onChange={handleTareaNameChange}
                                    />

                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        multiline
                                        value={tarea ? tarea.descripcion : ''}
                                        fullWidth
                                        rows={6}
                                        onChange={handleTareaDescrChange}
                                        label={'Descripción'} />
                                </Grid>

                                <Grid item >
                                    <TextField
                                        label={'Estado'}
                                        required
                                        fullWidth
                                        defaultValue={''}
                                        value={tarea ? tarea.estado_Tarea : 'No iniciado'}
                                        onChange={handleTareaEstadoChange}
                                        select>
                                        <MenuItem key={'No iniciado'} value={'No iniciado'}>No iniciado</MenuItem>
                                        <MenuItem key={'En proceso'} value={'En proceso'}>En proceso</MenuItem>
                                        <MenuItem key={'Finalizado'} value={'Finalizado'}>Finalizado</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item>
                                    <DatePicker
                                        value={tarea ? dayjs(tarea.create_date) : null}
                                        label={'Fecha de inicio'}
                                        disablePast
                                        onChange={handleStartDateChange} />
                                </Grid>

                                <Grid item>
                                    <DatePicker
                                        label={'Fecha de finalizacion'}
                                        disablePast
                                        onChange={handleEndDateChange}
                                        onClick={handleStartDateChange}
                                        value={tarea ? dayjs(tarea.ending_date) : null}
                                    />
                                </Grid>

                                <Grid item xs={6} justifySelf={'center'}>
                                    <Autocomplete
                                        options={usuarios ? usuarios : []}
                                        getOptionLabel={(option) => option.nombre}
                                        includeInputInList
                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                        autoComplete={true}
                                        noOptionsText={'Sin resultados'}
                                        filterOptions={(opciones, seleccion) => {
                                            const filteredOptions = opciones.filter(option => option.nombre.search(seleccion.inputValue) !== -1)
                                            console.log(seleccion.inputValue)
                                            return filteredOptions
                                        }
                                        }
                                        onChange={(e, v, r, d) => {
                                            console.log(v.uid)
                                            handleAgregarAsignado(v.uid)
                                        }}
                                        renderInput={(params) => <TextField {...params} label={'Asignar tarea'} />} />
                                </Grid>


                            </Grid>


                            <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>
                                <Grid item >
                                    <Button
                                        variant={'contained'}
                                        width={'100%'}
                                        color='primary'
                                        onClick={() => {
                                            let headers = new Headers
                                            headers.set("x-token", sessionStorage.getItem("token"));
                                            headers.set("Content-Type", "application/json");
                                            console.log(JSON.stringify({ ...tarea, proyecto: tarea.proyecto, asignados: tarea.asignados }))
                                            fetch(url + `/api/tareas`, {
                                                method: 'post',
                                                headers: headers,
                                                body: JSON.stringify({ ...tarea, proyecto: tarea.proyecto, asignados: tarea.asignados })
                                            })
                                                .then(raw => raw.json())
                                                .then(response => {
                                                    setTareaCreada(true)
                                                    console.log(response)
                                                })
                                        }
                                        }
                                    >Crear
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant={'contained'} color={'error'}
                                        onClick={() => navigate('/mistareas')}>Cancelar</Button>
                                </Grid>
                            </Grid>
                            <br></br>

                            <Dialog sx={{ margin: 0, padding: 0 }}
                                onClose={() => setIsModalErrorVisible(false)}
                                open={isModalErrorVisible}>
                                <DialogContent sx={{ margin: 0, padding: 0 }}>
                                    <Alert severity={'error'}>No se encontro el colaborador buscado.</Alert>

                                </DialogContent>
                            </Dialog>
                            <Dialog open={tareaCreada} onClose={handleModalTareaCreated}>
                                <DialogTitle>Exito</DialogTitle>
                                <DialogContent>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant={'h4'}>La tarea se creo exitosamente!</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant={'contained'} onClick={handleModalTareaCreated}>
                                                Aceptar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                            </Dialog>
                            <Dialog open={tareaModifica} onClose={handleModalTareaCreated}>
                                <DialogTitle>Exito</DialogTitle>
                                <DialogContent>
                                    <Grid container style={{ alignItems: 'center' }}>
                                        <Grid item xs={12}>
                                            <Typography variant={'h4'}>La tarea se modificó exitosamente!</Typography>
                                        </Grid>
                                        <Grid item style={{ justifyItems: "center" }}>
                                            <Button variant={'contained'} onClick={handleModalTareaCreated} style={{ alignContent: 'center' }}>
                                                Aceptar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                            </Dialog>
                        </Container > : <div></div>
                    }
                </div >
        }

    </>

}

export default CrearTarea;