import react from 'react'
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import DropZoneProfileImage from "./dropZoneProfileImage.jsx";


export default function PerfilCardBasic({info,openDialogEliminarCuenta,openDialogActualizarInfo}){

    console.log(info)

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
                                    <Button>Cambiar contraseña.</Button>
                                    <Button>Restablecer contraseña.</Button>
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