import React from 'react'
import { Card, CardActionArea, CardContent, Grid, Icon } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';

import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ConstructionIcon from '@mui/icons-material/Construction';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AvatarGroup from '@mui/material/AvatarGroup';
import { CardActions } from '@mui/material';
import { yellow } from '@mui/material/colors';


function OpcionCard(props) {

    return (<>
        <Card variant={"outlined"} >
            <CardActionArea onClick={props.handler} >
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} textAlign={"center"} >
                            <Typography variant={"h5"}>{props.titulo}</Typography>
                        </Grid>
                    </Grid>
                    <Typography>{props.desc}</Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    </>
    )

}

function CardArea(props) {
    return (<>
        <Card sm={{ maxWidth: 345 }} >
            <CardActionArea onClick={props.handler}>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.desc}
                    </Typography>
                </CardContent>
            </CardActionArea >
        </Card>
    </>
    )

}

function CardAreaProximamente(props) {
    return (<>
        <Card sx={{ height: 290 }}>
            <CardActionArea onClick={props.handler} >
                <CardMedia
                    component="img"
                    height="140"
                    image={props.img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.desc}
                    </Typography>
                </CardContent>
            </CardActionArea >
        </Card>
    </>
    )

}

function CardUserInfo(props) {
    return (<>
        <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
            <CardActionArea>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item md={8}>
                        <CardContent justifyContent="center">
                            <Avatar alt="Remy Sharp" src={props.imgUser} sx={{ width: 100, height: 100 }} />
                            <h5>{props.usuario}</h5>
                        </CardContent>
                    </Grid>
                </Grid>
                <CardContent>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CheckCircleOutlineIcon color="success" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Proyectos Finalizados" secondary={props.prFinalizados} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ConstructionIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Proyectos en proceso" secondary={props.prProceso} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventBusyIcon sx={{ color: yellow[500] }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Proyectos no iniciados" secondary={props.prNoIniciados} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Container maxWidth="sm" >
                    <AvatarGroup max={4}>
                        <Avatar alt="Remy Sharp" src={props.avatars[0]} />
                        <Avatar alt="Travis Howard" src={props.avatars[1]} />
                        <Avatar alt="Cindy Baker" src={props.avatars[2]} />
                        <Avatar alt="Agnes Walker" src={props.avatars[3]} />
                        <Avatar alt="Trevor Henderson" src={props.avatars[4]} />
                    </AvatarGroup>
                </Container>
            </CardActions>
        </Card>
    </>)
}

function CardReport(props) {
    return (<>
        <Card style={{ display: "flex", alignContent: "center" }}>
            <CardActionArea onClick={props.handler} >
                <CardMedia
                    component="img"
                    height="300px"
                    image={props.img}                    
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.desc}
                    </Typography>
                </CardContent>
            </CardActionArea >
        </Card>
    </>)
}



export { OpcionCard, CardArea, CardUserInfo, CardAreaProximamente, CardReport };