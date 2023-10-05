import react from 'react'
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import DropZoneProfileImage from "./dropZoneProfileImage.jsx";
import serverUrl from "../serverUrl.js";


export default function PerfilCardBasic({info,openDialogEliminarCuenta,openDialogActualizarInfo}){

    console.log(info)

    const borraCuenta = () =>{

        let header = new Headers()
        header.set('x-token',localStorage.getItem('token'))

        const init = {
            header:header,
            method:'DELETE',
        }

        fetch(serverUrl+`/api/${info.uid}`,init)
            .then(raw => {
                if(raw.ok){
                    localStorage.clear()
                    window.location.href = "/login"
                }
            })
    }

    return <>
            <Card>
                <CardHeader title={'Informacion personal.'} >
                </CardHeader>

                <CardContent>
                    <Grid container rowSpacing={5}>
                        <Grid item container justifyContent={'center'} sm={12} md={6}>
                            <Grid item>
                                <DropZoneProfileImage imagenUrl={info.img} userID={info.uid} />
                            </Grid>
                        </Grid>

                        <Grid item sm={12} md={6}>
                            <Grid item container justifyContent={'center'} direction={'row'} >

                                <Grid item>
                                    <Typography variant={'h5'}
                                                noWrap={false}>Nombre : {info.nombre}</Typography>
                                    <Typography variant={'h5'}
                                                noWrap={false}>Correo electronico : {info.email}</Typography>
                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid item sm={12} md={12} xs={12}>
                                <Stack alignItems={'flex-start'} spacing={2}>
                                    <Typography variant={'h5'}>Seguridad.</Typography>
                                    <Button disabled >Cambiar contraseña.</Button>
                                    <Button disabled>Restablecer contraseña.</Button>
                                </Stack>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions>
                    <Button onClick={() => openDialogActualizarInfo(true)}>Editar perfil.</Button>
                    <Button
                        onClick={() => openDialogEliminarCuenta(true)}
                        color={'error'}>Eliminar cuenta.</Button>
                </CardActions>
            </Card>




        </>

}