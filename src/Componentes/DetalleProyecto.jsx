import React from 'react'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ConstructionIcon from '@mui/icons-material/Construction';
import Divider from '@mui/material/Divider';
import { Pagination } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    bgcolor: 'transparent',
    p: 4,
    transition: '0.3s',
    textAlign: 'center',
    maxWidth: 500,
    maxHeight: 600,
    padding: 0,
    margin: 0
};

const styleModal = {
    maxWidth: 500,
    maxHeight: 600,
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: 'auto',
}

import { Link } from 'react-router-dom';

function BasicModal(nombre, descripcion, enlace, asignado, color, fecha) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        document.body.style.overflow = 'hidden';
    };
    const handleClose = () => {
        setOpen(false)
        document.body.style.overflow = 'auto';
    };

    //extraer campo nombre, img del elemento asignado
    return (
        <div>
            <Button variant='outlined' onClick={handleOpen} style={{ color: 'white', borderColor: 'white' }}>Ver tarea</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={styleModal}
            >
                <Box sx={style}>
                    <Card sx={{ bgcolor: color }}>
                        <CardActionArea>
                            <CardContent>
                                <Grid container>
                                    <Grid item md={12} margin='2%'>
                                        <Typography id="modal-modal-title" variant="h5" component="h2" color='white' align='center' fontWeight='bolder'>
                                            {nombre}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} style={{ alignSelf: 'center', padding: '2%' }}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} color='white' style={{ margin: '5%' }}>
                                            {descripcion}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} style={{ alignSelf: 'center', padding: '2%' }}>
                                        <Typography color='white'>Termina: {fecha}</Typography>
                                        <Typography color='white' variant='subtitle1' style={{ marginTop: '3%' }}>Asignado</Typography>
                                        <div style={{ display: 'flex', alignContent: 'center', margin: '2%', justifyContent: 'center' }}>
                                            <Tooltip title={"Nombre"} style={{ marginRight: '3%' }}>
                                                <Avatar src={asignado.img} />
                                            </Tooltip>
                                            <Typography variant='subtitle2' color={'white'} style={{ alignSelf: 'center' }}>{asignado.nombre}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item md={12} margin='2%'>
                                    <Link to={enlace}>
                                        <Button variant='outlined' style={{ color: 'white', borderColor: 'white', fontWeight: 'lighter' }}>Editar Tarea</Button>
                                    </Link>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <CloseIcon
                        edge="end"
                        color='action'
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', top: 5, right: 5, cursor:'pointer' }}
                    >                        
                    </CloseIcon>
                </Box>
            </Modal>
        </div>
    );
}


function BasicCard(props) {
    let color
    switch (props.estado) {
        case "Finalizado":
            color = "#145406"
            break;
        case "No iniciado":
            color = "#540e06"
            break;
        case "En proceso":
            color = "#a1a102"
            break;
        default:

            break;
    }
    let descripcion
    if (props.descripcion.length > 35) {
        descripcion = props.descripcion.substring(0, 35) + '...'
    } else {
        descripcion = props.descripcion
    }
    return (
        <Card sx={{ minWidth: 275 }} style={{ background: color, color: 'white' }}>
            <CardContent >
                <Typography variant="h5" component="div">
                    {props.nombre}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                    {props.estado}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="white">
                </Typography>
                <Typography variant="body2">
                    {descripcion}
                </Typography>
            </CardContent>
            <CardActions>
                {BasicModal(props.nombre, props.descripcion, props.linkT, props.asignado, color, props.final.substring(0, 10))}
            </CardActions>
        </Card>
    );
}

function OpcionCard(props) {

    return (<>
        <Card variant={"outlined"}>
            <CardActionArea onClick={props.handler} >
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} textAlign={"center"} >
                            <Typography variant={"h5"}>{props.titulo}</Typography>
                        </Grid>
                    </Grid>
                    <Typography textAlign={"center"} >{props.desc}<AlarmIcon />1</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}

function CardTarea(props) {

    return (<>
        <Card variant={"outlined"}>
            <CardActionArea onClick={props.handler} sx={{ height: 200 }}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} textAlign={"center"} >
                            <Typography variant={"h5"}>{props.titulo}</Typography>
                        </Grid>
                    </Grid>
                    <Typography textAlign={"center"} >{props.desc}<AlarmIcon />1</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}

function OpcionCardProgreso(props) {

    return (<>
        <Card variant={"outlined"} style={{ background: props.color, color: 'white' }}>
            <CardActionArea onClick={props.handler} >
                <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography >{props.desc}{props.icono}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}

function OpcionCardDetalle(props) {

    return (<>
        <Card variant={"outlined"} style={{ background: '#214A87', color: 'white' }}>
            <CardActionArea onClick={props.handler} sx={{ height: 350 }}>
                <CardContent style={{ padding: '3%' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography textAlign={"center"} variant={"h5"}>{props.titulo}</Typography>
                        </Grid>
                    </Grid>
                    <Typography textAlign={"center"} fontSize='1rem'>{props.desc}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}

function colaboradoresTarget(props) {
    return (<>
        <Grid container spacing={1} style={{ marginBottom: '4%' }}>
            <Grid item style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Tooltip title={props.nombre} style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Avatar src={props.img} />
                    <div style={{ marginLeft: '4%' }}>
                        <Typography variant={"h6"}>{props.nombre}</Typography>
                        <Typography variant={"subtitle1"}>{props.email}</Typography>
                    </div>
                </Tooltip>
            </Grid>
        </Grid>
        <Divider />
    </>)
}

function OpcionCardRecursos(props) {
    return (
        <>
            <Card style={{ background: '#214A87', width: '100%', color: 'white' }}>
                <CardActionArea onClick={props.handler} sx={{ height: 350 }} >
                    <Typography variant="h5" textAlign='center'>Colaboradores</Typography>
                    <Grid container spacing={1} justifyContent="center" >
                        <CardContent s>
                            {
                                props.colaboradores ?
                                    props.colaboradores.map((element, index) => (
                                        <div key={index} >{colaboradoresTarget(element)}</div>
                                    ))
                                    : <CircularProgress />

                            }
                        </CardContent>
                    </Grid>
                </CardActionArea>
            </Card>
        </>
    );
}


function OpcionCardTareas(props) {
    return (<>
        <Card variant={"outlined"} sx={{ p: 0.3 }} style={{ background: '#214A87', color: 'white' }}>
            <CardActionArea onClick={props.handler} >
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} textAlign={"center"} >
                            <Typography variant={"h5"}>{props.titulo}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={6}  >
                            <Typography>Fecha de inicio</Typography>
                            <Typography>{props.fechaInicio}</Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography>Fecha de Finalización</Typography>
                            <Typography>{props.fechaFinal}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}

function OpcionCardAvance(props) {
    return (<>
        <Card sx={{ mb: 4 }}>
            <CardActionArea onClick={props.handler} >
                <CardContent style={{ background: 'white' }}>
                    <div className="half-arc" style={{ '--percentage': props.rango, background: '#214A87' }}>
                        <span className="label" style={{ fontSize: '1.7em', color: '#214A87' }}>{props.porcentaje}%</span>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}





export { OpcionCard, OpcionCardTareas, OpcionCardAvance, OpcionCardDetalle, OpcionCardRecursos, OpcionCardProgreso, CardTarea, BasicCard, BasicModal };