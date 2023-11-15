import react from 'react'
import { Card, CardActions, CardContent, CardHeader, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import DropZoneProfileImage from "./dropZoneProfileImage.jsx";


export default function PerfilCardBasic({ info, openDialogEliminarCuenta, openDialogActualizarInfo, openDialogUpdatePassword }) {

    console.log(info)

    return <>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Card style={{ width: '90vw', maxWidth: '700px', background:'#214A87', color:'white' }}>
                <CardContent>
                    <Typography variant='h4' align='center' margin='2%'>Información Personal</Typography>
                    <Grid container>
                        <Grid item xs={12} md={8} align='center' style={{display:'block', justifyContent:'center'}}>
                            <Grid item xs={12}>
                                <DropZoneProfileImage imagenUrl={info.img} userID={info.uid} />
                            </Grid>
                            <Grid item container justifyContent={'center'} direction={'row'} >
                                <Grid item>
                                    <Typography variant={'h5'}
                                        noWrap={false} align='left'>Nombre : {info.nombre}</Typography>
                                    <Typography variant={'h5'}
                                        noWrap={false} align='left'>Correo electronico : {info.email}</Typography>
                                </Grid>
                            </Grid>
                            <Button variant='contained' style={{backgroundColor:'white', border:'none', color:'#214A87', marginTop:'5%'}} onClick={() => openDialogActualizarInfo(true)}>Editar perfil</Button>
                        </Grid>
                        <Grid item sm={12} md={4} xs={12}>
                            <Stack align='center' spacing={2}>
                                <Typography variant={'h5'}>Seguridad</Typography>
                                <Button variant='contained' style={{backgroundColor:'white', border:'none', color:'#214A87'}}
                                onClick={() => {
                                    openDialogUpdatePassword(true)
                                }}>Cambiar contraseña</Button>
                                <Button variant='contained' color='error'
                                onClick={()=>{
                                    openDialogEliminarCuenta(true)
                                }}>
                                Eliminar cuenta
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    </>

}