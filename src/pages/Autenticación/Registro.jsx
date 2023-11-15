import react, { useState } from 'react'
import Container from "@mui/material/Container";
import {
    Alert,
    Card,
    CardContent,
    CardHeader, CircularProgress,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    Grid,
    Snackbar,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";
import AppBarIndex from '../../Componentes/AppBarLogin.jsx';

import AlertTitle from '@mui/material/AlertTitle';


export default function Registro() {

    let navigate = useNavigate()

    let [nombre, setNombre] = useState()
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()
    let [confirmPassword, setConfirmPassword] = useState()

    let [errorNombre, setErrorNombre] = useState(false)
    let [errorEmail, setErrorEmail] = useState(false)
    let [errorPassword, setErrorPassword] = useState(false)
    let [errorConfirmPassword, setErrorConfirmPassword] = useState(false)

    let [cuentaCreadaExitosamente, setCuentaCreadaExitosamente] = useState(false)

    let [error, setError] = useState(false)
    let [textError, setTextError] = useState('')
    const [creada, setCreada] = useState(false)

    let handleOnNombreChange = (e) => {
        let valor = e.target.value;
        setNombre(valor)
        let errorNombre = valor.length > 0 && valor.length < 6;
        setErrorNombre(errorNombre)
    }

    let handleOnEmailChange = (e) => {
        if (e.target.validity.typeMismatch) {
            setErrorEmail(true)
            setEmail(e.target.value)
            console.log(errorEmail)
        } else {
            setErrorEmail(false)
            setEmail(e.target.value)
        }
    }
    const handleModalProjectCreated = () => {
        setCreada(false)
    }


    let handleOnPasswordChange = (e) => {
        let valor = e.target.value
        setPassword(valor)

        let passwordsDifieren = confirmPassword === valor

        if (!passwordsDifieren) { setErrorPassword(true) }
        else {
            setErrorPassword((valor.length > 0 && valor.length < 6))
        }


    }

    let handleOnConfirmPasswordChange = (e) => {
        let valor = e.target.value
        setConfirmPassword(valor)
        //si contraseñas don't match


        let passwordsMatch = valor === password
        setErrorConfirmPassword(!passwordsMatch)
    }


    const handleOnCloseError = () => {
        setError(false)
    }

    const createAccount = () => {
        let rol = "Diseñador"
        const headers = new Headers
        const usuario = {
            nombre: nombre,
            password: password,
            email: email,
            img: '',
            rol: rol,
            estado: true,
            google: false
        }

        headers.set('Content-Type', 'application/json')

        const init = {
            method: 'post',
            headers: headers,
            body: JSON.stringify(usuario)
        }

        fetch(url + '/api/usuarios', init)
            .then(raw => {

                return raw.json()
            }).then(body => {


                const typeError = body?.errors?.[0]
                console.log(typeError)
                if (typeError) {
                    switch (typeError.path) {
                        case 'email':
                            setTextError(typeError.msg)
                            setErrorEmail(true)
                            setError(true)
                            
                            break;
                    }
                    setCreada(true)

                } else {
                    
                    setCuentaCreadaExitosamente(true)
                    setTimeout(redirect, 1000)

                }
            })

    }


    const redirect = () => navigate('/login')

    let activarRegistro = errorEmail | errorPassword | errorConfirmPassword | errorNombre | !nombre | !password | !email
        | !confirmPassword

    return <>
        <AppBarIndex></AppBarIndex>
        <Container style={{ width: '90%', maxWidth: '500px', marginTop: '10%' }}>
            <Card sx={{ 'margin-top': '10%' }} variant={'outlined'} style={{ paddingTop: '5%', backgroundColor: '#214A87' }}>
                <Typography variant={'h4'} align='center' color='white'>
                    Registrate
                </Typography>
                <CardContent style={{ display: 'flex', justifyContent: 'center', paddingBottom:'1%' }}>
                    <Grid container
                        display={'block'}
                        justifyContent={'center'}
                        alignContent={'center'}
                        style={{ width: '75%' }}>
                        <Grid item md={12} style={{ marginBottom: '3%', padding: '0%' }}>
                            <p style={{ margin: 0, padding: 0, color: 'white' }}>Nombre completo</p>
                            <TextField
                                value={nombre}
                                error={errorNombre}
                                onChange={handleOnNombreChange}
                                helperText={errorNombre ? 'El nombre debe tener mas de 6 caracteres' : ''}
                                fullWidth
                                style={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item md={12} style={{ marginBottom: '3%' }} >
                            <p style={{ margin: 0, padding: 0, color: 'white' }}>Correo electronico</p>
                            <TextField
                                type={'email'}
                                onChange={handleOnEmailChange}
                                value={email}
                                error={errorEmail}
                                fullWidth
                                style={{ backgroundColor: 'white' }} />
                        </Grid>
                        <Grid item md={12} style={{ marginBottom: '3%' }}>
                            <p style={{ margin: 0, padding: 0, color: 'white' }}>Contraseña</p>
                            <TextField
                                type={'password'}
                                onChange={handleOnPasswordChange}
                                error={errorPassword}
                                helperText={password?.toString() > 0 & password?.toString() < 6 ? 'La contraseña debe tener 6 o mas caracteres' : errorPassword ? 'Las contraseñas no coinciden.' : ''}
                                value={password}
                                fullWidth
                                style={{ backgroundColor: 'white' }} />
                        </Grid>
                        <Grid item md={12} style={{ marginBottom: '3%' }}>
                            <p style={{ margin: 0, padding: 0, color: 'white' }}>Confirmar contraseña</p>
                            <TextField
                                type={'password'}
                                onChange={handleOnConfirmPasswordChange}
                                helperText={errorConfirmPassword ? 'Las contraseñas no coinciden' : ''}
                                error={errorConfirmPassword}
                                value={confirmPassword}
                                fullWidth
                                style={{ backgroundColor: 'white' }} />
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }} >
                            <Button
                                //disabled={Boolean(activarRegistro)}
                                onClick={createAccount}
                                color='success'
                                variant='contained'>Registrarse</Button>
                        </Grid>
                        <Grid item md={12} align='center' margin={'3%'}>
                            <p style={{ padding: 0, margin: 0, fontWeight: 300, color:'white' }}>¿Ya tienes cuenta?</p>
                            <Button onClick={() => navigate('/login')} style={{ padding: 0, margin: 0, fontWeight: 700, color:'white' }}>
                                Inicia sesión
                            </Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
            <Dialog onClose={() => navigate('/login')}
                open={cuentaCreadaExitosamente}>
                <Alert>Cuenta creadad exitosamente!</Alert>
            </Dialog>

            <Snackbar autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={error}
                onClose={handleOnCloseError}>
                <Alert severity={"error"} onClose={() => setError(false)}>
                    {textError}
                </Alert>
            </Snackbar>

            <Dialog open={cuentaCreadaExitosamente}>
                <DialogTitle>
                    <Alert severity={'success'}>Cuenta creada exitosamente</Alert>
                </DialogTitle>
                <DialogActions><Button onClick={redirect}>Iniciar sesion.</Button></DialogActions>
            </Dialog>

        </Container>
        <Snackbar open={creada} autoHideDuration={6000} onClose={handleModalProjectCreated} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
            <Alert onClose={handleModalProjectCreated} severity="error" variant="filled">
                <AlertTitle>Error al registrarse</AlertTitle>
                Ingrese los datos correctamente
            </Alert>
        </Snackbar>
    </>
}