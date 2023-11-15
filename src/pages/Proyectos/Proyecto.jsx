import react, { useEffect, useState } from 'react'
import {
    Alert,
    AlertTitle,
    Autocomplete, Badge,
    Chip,
    CircularProgress, Dialog, DialogContent, DialogTitle,
    Grid,
    Paper,
    Skeleton,
    styled,
    TextField
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import projectReducer from "../../js/projectReducer.js";
import { Circle } from "@mui/icons-material";
import url from "../../serverUrl.js";
import Snackbar from '@mui/material/Snackbar';


function Proyecto() {

    let initialState = {}

    const { id } = useParams()
    const navigate = useNavigate()

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
    /*
    * TODO
    *
    *
    * Popular los campos en base al proyecto* CASI COMPLETADO
    * Implementar el reducer al cambiar algun estado del proyecto
    * */

    const [buttonAddCollaboratorDisabled, setButtonAddCollaboratorDisabled] = useState(true)
    const [isLookingForCollaborator, setIsLookingForCollaborator] = useState(false)
    const [newProject, setNewProject] = useState()
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false)
    const [selectedCollaboratorFormat, setSelectedCollaboratorFormat] = useState()
    const [collaborators, setCollaborators] = useState([])
    const [errorSelectedCollaboratorFormat, setErrorSelectedCollaboratorFormat] = useState(false)
    const [collaboratorEmail, setCollaboratorEmail] = useState()
    const [project, setProject] = useState()
    const [wasProjectSuccessfulyCreated, setWasProjectSuccessfullyCreated] = useState(false)
    //ELIMINAR LUEGO
    const [usuarios, setUsuarios] = useState()
    const [options, setOptions] = useState()

    useEffect(() => {

        const header = new Headers

        header.set("x-token", sessionStorage.getItem("token"))

        if (id) {
            fetch(url + `/api/proyectos/${id}`, {
                headers: header,
                method: 'get'
            })
                .then(raw => raw.json())
                .then(respuesta => {
                    const rawProject = respuesta.resto._doc

                    const project = {
                        uid: rawProject._id,
                        ...rawProject,
                        colaboradores: rawProject.colaboradores
                    }
                    setProject(project)
                    console.log(project)
                })
        } else {
            setProject({
                nombre: '',
                propietario: localStorage.getItem('uid'),
                create_date: dayjs(new Date()),
                ending_date: '',
                estado_Proyecto: 'No iniciado',
                colaboradores: [],
                descripcion: ''
            })

        }

        /*
       fetch(url+'/api/usuarios',{
           method:'get',
           headers:header
       }).then(rawResponse => rawResponse.json()).then(response =>{setCollaborators(response.usuarios)})
        */

    }, [])

    const handleCollaboratorInputChange = (e) => {
        const valor = e.target.value



        if ((e.target.validity.typeMismatch || valor.search('.com') === -1) && valor !== '') {

            setButtonAddCollaboratorDisabled(true)
            setErrorSelectedCollaboratorFormat(true)
        } else {

            if (valor.length === 0) {
                setButtonAddCollaboratorDisabled(true)
                setErrorSelectedCollaboratorFormat(false)
            } else {
                setErrorSelectedCollaboratorFormat(false)
                setButtonAddCollaboratorDisabled(false)
                setCollaboratorEmail(valor)
            }


        }




    }
    const deleteCollaborator = (uid) => {

        let auxListCollaborators = project.colaboradores.filter(colaborador => colaborador.uid !== uid)

        setProject({ ...project, colaboradores: auxListCollaborators })

        console.log(auxListCollaborators)


    }

    const handleProjectNameChange = (e) => {
        const valor = e.target.value
        const changeInProject = projectReducer(project, { type: "SET_NOMBRE_PROYECTO", payload: valor })
        setProject(changeInProject)
    }

    const handleProjectDescrChange = (e) => {
        const newDescr = e.target.value
        const changeInProject = projectReducer(project, { type: "SET_DESCRIPCION", payload: newDescr })
        setProject(changeInProject)
    }

    const handleProjectStateChange = (e) => {
        const valor = e.target.value
        const changeInProject = projectReducer(project, { type: "SET_ESTADO_PROYECTO", payload: valor })
        setProject(changeInProject)
    }

    const handleStartDateChange = (value, context) => {
        const changeInProject = projectReducer(project, { type: "SET_FECHA_CREACION", payload: value })
        setProject(changeInProject)
    }

    const handleEndDateChange = (value, context) => {
        const changeInProject = projectReducer(project, { type: "SET_FECHA_FINALIZACION", payload: value })
        setProject(changeInProject)
    }

    const searchCollaborator = () => {

        let headers = new Headers
        headers.append("x-token", sessionStorage.getItem("token"));

        setIsLookingForCollaborator(true)



        fetch(url + `/api/usuarios/email/${collaboratorEmail}`, {
            method: 'get',
            headers: headers
        })
            .then(raw => raw.json())
            .then(respuesta => {
                console.log(respuesta)


                if (project) {

                    if (respuesta.usuario) {
                        let yaExiste = project.colaboradores.find(colab => colab.uid === respuesta.usuario.uid)
                        if (yaExiste) {
                            setIsLookingForCollaborator(false)
                            return;
                        }

                        let auxProject = {
                            ...project,
                            colaboradores: [...project?.colaboradores, respuesta.usuario]
                        }

                        setProject(auxProject)
                    } else {
                        setIsModalErrorVisible(true)

                    }

                    setIsLookingForCollaborator(false)
                }
            })
    }

    const handleModalProjectCreated = () => {
        setWasProjectSuccessfullyCreated(false)
        history.back()
    }

    let loading = (id && !project)

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

                : <Container>
                    <Typography variant={'h3'} className={'mb-4'}>Crear proyecto.</Typography>
                    <Grid container alignItems={'center'} spacing={4} className={'mb-4'} >
                        <Grid item xs={12} >

                            <TextField
                                required
                                value={project ? project.nombre : ''}
                                hiddenLabel={project ? true : false}
                                label={'Nombre del proyecto'}
                                onChange={handleProjectNameChange}

                            />

                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                multiline
                                value={project ? project.descripcion : ''}
                                fullWidth
                                rows={6}
                                maxRows={6}
                                onChange={handleProjectDescrChange}
                                label={'Descripción'} />
                        </Grid>

                        <Grid item >
                            <TextField
                                label={'Estado'}
                                required
                                fullWidth
                                defaultValue={'No iniciado'}
                                value={project ? project.estado_Proyecto : 'No iniciado'}
                                onChange={handleProjectStateChange}
                                select>
                                <MenuItem key={'No iniciado'} value={'No iniciado'}>No iniciado</MenuItem>
                                <MenuItem key={'En proceso'} value={'En proceso'}>En proceso</MenuItem>
                                <MenuItem key={'Finalizado'} value={'Finalizado'}>Finalizado</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item>
                            <DatePicker
                                value={project ? dayjs(project.create_date) : null}
                                label={'Fecha de inicio'}
                                disablePast
                                onChange={(e) => console.log(e.$d)} />
                        </Grid>

                        <Grid item>
                            <DatePicker
                                label={'Fecha de finalizacion'}
                                disablePast
                                onChange={handleEndDateChange}
                                onClick={handleStartDateChange}
                                value={project ? dayjs(project.ending_date) : null} />
                        </Grid>
                    </Grid>








                    <Grid container spacing={4} alignItems={'center'} className={'mb-4'}>

                        <Grid item>
                            <TextField
                                onChange={handleCollaboratorInputChange}
                                error={errorSelectedCollaboratorFormat}
                                type={'email'}
                                label={'Añadir colaborador'} />


                        </Grid>

                        <Grid item>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                onClick={searchCollaborator}
                                disabled={buttonAddCollaboratorDisabled} >Buscar colaborador</Button>
                        </Grid>

                        <Grid item>
                            {
                                errorSelectedCollaboratorFormat
                                    ?
                                    <Alert severity={'error'}>
                                        <AlertTitle>Ingrese un correo valido.</AlertTitle>
                                    </Alert>
                                    : <></>
                            }

                        </Grid>

                        <Grid item xs={12}>
                            <Paper sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0.5,
                                m: 0,
                            }} component={'ul'}
                            >
                                {project?.colaboradores ?
                                    project.colaboradores.map(colaborador => {
                                        console.log(colaborador)
                                        return <ListItem>
                                            <Chip
                                                label={colaborador.nombre}
                                                onDelete={() => { deleteCollaborator(colaborador.uid) }} ></Chip>
                                        </ListItem>
                                    })
                                    : <></>
                                }
                                {
                                    isLookingForCollaborator ? <CircularProgress /> : <></>
                                }


                                {
                                    project?.colaboradores && !isLookingForCollaborator ? <></> : <TextField
                                        disabled
                                        label={'Sin colaboradores'}
                                        fullWidth />
                                }
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems={'center'} justifyContent={'center'} >
                        <Grid item >

                            <Button
                                variant={'contained'}
                                color={id ? 'warning' : 'primary'}
                                onClick={() => {

                                    let collaboratorsUidOnly = project.colaboradores.map(colab => colab.uid)
                                    console.log(collaboratorsUidOnly)
                                    let processedProject = { ...project, colaboradores: collaboratorsUidOnly }

                                    let header = new Headers
                                    header.set("x-token", sessionStorage.getItem("token"))
                                    header.set('Content-type', 'application/json')



                                    if (!id) {
                                        fetch(url + '/api/proyectos', {
                                            method: 'post',
                                            headers: header,
                                            body: JSON.stringify(processedProject)
                                        })
                                            .then(raw => raw.json())
                                            .then(respuesta => setWasProjectSuccessfullyCreated(true))
                                    } else {
                                        fetch(url + `/api/proyectos/${project.uid}`, {
                                            method: 'put',
                                            headers: header,
                                            body: JSON.stringify(processedProject)
                                        })
                                            .then(raw => raw.json())
                                            .then(respuesta => navigate('/misproyectos'))
                                    }




                                    console.log(JSON.stringify(project))
                                }}
                            >

                                {id ? 'Modificar' : 'Crear'}
                            </Button>





                        </Grid>
                        <Grid item>
                            <Button
                                variant={'contained'}
                                onClick={() => history.back()}
                                color={'error'}>Cancelar</Button>
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


                    <Dialog onClose={handleModalProjectCreated}>
                        <DialogTitle>Exito.</DialogTitle>
                        <DialogContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant={'h4'}>El proyecto se creo exitosamente!</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant={'contained'} onClick={handleModalProjectCreated}>
                                        Aceptar
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>

                    <Snackbar open={wasProjectSuccessfulyCreated} autoHideDuration={6000} onClose={handleModalProjectCreated} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
                        <Alert onClose={handleModalProjectCreated} severity="success" variant="filled">
                            <AlertTitle>Creado</AlertTitle>
                            Proyecto creado correctamente
                        </Alert>
                    </Snackbar>

                </Container>


        }



    </>
}

export default Proyecto;