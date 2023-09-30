import react, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Image } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";
import AppBarLogin from '../../Componentes/AppBar.jsx';

function Registro() {

    const navigate = useNavigate()

    let [nombre, setNombre] = useState();
    let [password, setPassword] = useState();
    let [passwordConfirm, setPasswordConfirm] = useState();
    let [email, setEmail] = useState();
    let [fotoPerfil, setFotoPerfil] = useState()

    //Errores
    let [errorPasswordTooShort, setErrorPasswordTooShort] = useState(false)
    let [errorPassConfirmTooShort, setErrorPassConfirmTooShort] = useState(false)
    let [errorNonMatchingPasswords, setErrorNonMatchingPasswords] = useState(false)
    let [errorEmailFormat, setErrorEmailFormat] = useState(false)


    //Misc
    let [progressBarActive, setProgressBarActive] = useState(false)
    let [disablePassConfirm, setDisablePassConfirm] = useState(true)

    const [wasAcountSuccessfullyCreated, setWasAccountSuccessfullyCreated] = useState(false)
    const changeNombre = e => {
        setNombre(e.target.value)
    }

    const changePassword = e => {
        const target = e.target
        if (target.validity.tooShort || target.value === '') {
            setErrorPasswordTooShort(true)
            setDisablePassConfirm(true)
            return;
        }

        setDisablePassConfirm(false)
        setErrorPasswordTooShort(false)
        setPassword(target.value)
    }

    const changePasswordConfirm = e => {
        const target = e.target
        if (target.validity.tooShort === true) {
            setErrorPassConfirmTooShort(true)
            return;
        }


        setErrorPassConfirmTooShort(false)
        setPasswordConfirm(target.value)


    }

    const changeEmail = e => {
        const target = e.target
        if (target.validity.typeMismatch) {
            setErrorEmailFormat(true)
            return;
        }
        setErrorEmailFormat(false)
        setEmail(target.value)
    }

    const passwordErrorText = (tooShort, NonMatching) => {
        if (tooShort) return 'La contraseña debe tener almenos 6 carateres.'
        if (NonMatching) return 'Las contraseñas no coinciden'


        return "";

    }

    //TO-DO validar las que las contraseñas coincidan, si es asi, llamar a la funcion para crear cuenta
    const validatePasswordMatching = () => {

    }

    const imprimirValores = () => {
        console.log(`Pass ${password}\nConfirm ${passwordConfirm}`)
    }

    const profilePictureSelection = e => {
        const target = e.target
        if (target.files) {
            setFotoPerfil(e.target.files[0])
        }

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
            .then(raw => raw.json())
            .then(respuesta => {
                console.log(respuesta)
                setWasAccountSuccessfullyCreated(true)
            })

    }

    const handleNameChange = e => {
        const valor = e.target.value

        setNombre(valor)

    }

    return <>

        <AppBarLogin />

        <div className={'container'}>
            <h1 className={'mb-4'}>Crear cuenta.</h1>
            <div className={'row'}>
                <div className={'col-sm-6 mb-4'}>
                    <label className={'mb-4'}>Nombre completo</label>
                    <TextField className={'form-control form-control-sm mb-4'}
                        onChange={handleNameChange} />
                    <label className={'mb-4'}>Correo electronico</label>
                    <TextField className={'form-control form-control-sm'}
                        type={'email'}
                        error={errorEmailFormat}
                        helperText={errorEmailFormat ? 'Introduzca un email valido.' : ''}
                        onChange={changeEmail}
                        required />
                </div>
                <div className={'col-sm d-flex justify-content-center'}>
                    <div className={'align-self-center'}>
                        {
                            /*
                            fotoPerfil ?
                                <>
                                    <div style={{display:"block"}}>
                                        <Avatar src={URL.createObjectURL(fotoPerfil)}
                                            //className={'img-thumbnail rounded'}                                               
                                        />
                                    </div>
                                    <button onClick={()=>setFotoPerfil(undefined)}>Eliminar.</button>
                                </>
                                :
                                <>
                                    <h4>Seleccionar foto de perfil.</h4>
                                    <Image />
                                    <input  type={'file'} accept={'.jpg,.png,jpgeg'} onChange={profilePictureSelection}/>
                                </>
    
                        */
                        }

                    </div>


                </div>

                <div className={'row mb-4'} style={{ paddingRight: 0 }} >
                    <div className={'col-sm-6'} style={{ paddingRight: 0 }}>
                        <label>Contraseña</label>
                        <TextField className={'form-control'}
                            type={'password'}
                            required
                            error={errorPasswordTooShort || errorNonMatchingPasswords}
                            helperText={passwordErrorText(errorPasswordTooShort, errorNonMatchingPasswords)}
                            onChange={changePassword}
                            inputProps={{ minLength: 6 }} />
                    </div>

                    <div className={'col-sm-6'} style={{ paddingRight: 0 }}>
                        <label>Confirmar contraseña</label>
                        <TextField className={'form-control'}
                            type={'password'}
                            required
                            placeholder={disablePassConfirm ? 'Introduzca una contraseña para habilitar' : ''}
                            disabled={disablePassConfirm}
                            error={errorPassConfirmTooShort || errorNonMatchingPasswords}
                            helperText={passwordErrorText(errorPassConfirmTooShort, errorNonMatchingPasswords)}
                            onChange={changePasswordConfirm}
                            inputProps={{ minLength: 6 }} />
                    </div>
                </div>



            </div>
            <div className={'row text-center'}>

                <div className={'col'}>
                    <Button
                        onClick={createAccount}
                        variant={'contained'}
                        color={'success'}>Crear cuenta.</Button>
                </div>

                <div className={'col'}>


                    <Button
                        disable={errorPasswordTooShort | errorEmailFormat | errorPassConfirmTooShort}
                        variant={'contained'} onClick={() => navigate('/login')}>Iniciar sesión.</Button>
                </div>


            </div>
        </div>

        <Dialog open={wasAcountSuccessfullyCreated}>
            <DialogTitle>Exito.</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>La cuenta se creo exitosamente!</Typography>
                        <Typography>Inicie sesión para ingresar a sus proyectos.</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => navigate('/login')}
                            variant={'contained'}>Aceptar</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>

    </>


}

export default Registro;