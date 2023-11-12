import React from 'react'
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    p: 4,
    transition: '0.3s',
};

import { Link } from 'react-router-dom';

function BasicModal(nombre, descripcion, enlace, asignado) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(true) 
        document.body.style.overflowY = 'hidden';};
    const handleClose = () => {setOpen(false)
        document.body.style.overflowY = 'auto';};

    //extraer campo nombre, img del elemento asignado

    return (
        <div>
            <Button variant='outlined' onClick={handleOpen} style={{ color: 'white' }}>Ver tarea</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Card sx={{ maxWidth: 345, bgcolor: '#214A87' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://res.cloudinary.com/dykkzngwd/image/upload/v1695007522/ImagenesGestor/Administrador-de-tareas-gratis-header_c2gmj9.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography id="modal-modal-title" variant="h6" component="h2" color='white'>
                                    {nombre}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} color='white'>
                                    {descripcion}
                                </Typography>
                                <Tooltip title={"Nombre"}>
                                    <Avatar src={asignado} />
                                </Tooltip>
                                <Link to={enlace}>
                                    <Button variant='outlined' style={{ color: 'white' }}>Editar Tarea</Button>
                                </Link>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Box>
            </Modal>
        </div>
    );
}


function BasicCard(props) {
    return (
        <Card sx={{ minWidth: 275 }} style={{ background: '#214A87', color: 'white' }}>
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
                    {props.descripcion}
                </Typography>
            </CardContent>
            <CardActions>
                {BasicModal(props.nombre, props.descripcion, props.linkT, props.asignado)}
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
        <Card variant={"outlined"} style={{ background: '#214A87', color: 'white' }}>
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