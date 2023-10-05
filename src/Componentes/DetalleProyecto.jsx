import React from 'react'
import {Card, CardActionArea, CardContent, Grid} from "@mui/material";
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


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Titulo de la tarea
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }


function BasicCard() {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Estado de la tarea
          </Typography>
          <Typography variant="h5" component="div">
            Titulo de la tarea
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            Descripcion: well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
            {BasicModal()}
        </CardActions>
      </Card>
    );
  }

function OpcionCard(props){

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

function CardTarea(props){

    return (<>
        <Card variant={"outlined"}>
            <CardActionArea onClick={props.handler} sx={{height: 200}}>
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

function OpcionCardProgreso(props){

    return (<>
        <Card variant={"outlined"}>
            <CardActionArea onClick={props.handler} >
                <CardContent>
                    <Typography >{props.desc}{props.icono}1</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}

function OpcionCardDetalle(props){

    return (<>
        <Card variant={"outlined"}>
            <CardActionArea onClick={props.handler} sx={{height: 352}}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography textAlign={"center"} variant={"h5"}>{props.titulo}</Typography>
                        </Grid>
                    </Grid>
                    <Typography textAlign={"center"}>{props.desc}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}

function colaboradoresTarget(props){
    return (<>
        <Grid container spacing={1} justifyContent="center">
                            <Grid item sx={3}>
                                <Tooltip title={props.nombre}>
                                <Avatar src={props.img}/>   
                                </Tooltip>                                              
                            </Grid>
                            <Grid item sx={3}>                                
                                <IconButton aria-label="delete" color='warning'>
                                        <AlarmIcon />11
                                    </IconButton>                                
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item sx={3}>                                
                                <IconButton aria-label="delete" color='warning'>
                                        <ConstructionIcon />11
                                    </IconButton>                                
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item sx={3}> 
                                <IconButton aria-label="delete" color='warning'>
                                        <CheckBoxIcon />11
                                    </IconButton>
                            </Grid>
                    </Grid>
                    <Divider />
    </>)
}

function OpcionCardRecursos(props) {
    console.log(props.colaboradores)
  return (
    <>
      <Card variant={"outlined"}>
        <CardActionArea onClick={props.handler} sx={{ height: 352 }}>
          <Grid container spacing={1} justifyContent="center">
            <CardContent>
              {props.colaboradores.map((element, index) => (
                <div key={index}>{colaboradoresTarget(element)}</div>
              ))}
            </CardContent>
          </Grid>
        </CardActionArea>
      </Card>
    </>
  );
}


function OpcionCardTareas(props){
    console.log("No entro")
    return (<>
        <Card variant={"outlined"} sx={{p: 0.3}}>
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

function OpcionCardAvance(props){
    return (<>
        <Card variant={"outlined"} sx={{mb: 2}}>
            <CardActionArea onClick={props.handler} >
                <CardContent>
                    <div className="half-arc" style={{'--percentage': props.rango}}>
                        <span className="label">{props.porcentaje}%</span>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    )
}





export {OpcionCard, OpcionCardTareas, OpcionCardAvance, OpcionCardDetalle, OpcionCardRecursos, OpcionCardProgreso, CardTarea, BasicCard, BasicModal};