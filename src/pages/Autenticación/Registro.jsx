import react, {useState} from 'react'
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
import {useNavigate} from "react-router-dom";
import url from "../../serverUrl.js";


export default function Registro(){

    let navigate = useNavigate()

    let [nombre,setNombre] = useState()
    let [email,setEmail] = useState()
    let [password,setPassword] = useState()
    let [confirmPassword,setConfirmPassword] = useState()

    let [errorNombre,setErrorNombre] = useState(false)
    let [errorEmail,setErrorEmail] = useState(false)
    let [errorPassword,setErrorPassword] = useState(false)
    let [errorConfirmPassword,setErrorConfirmPassword] = useState(false)

    let [cuentaCreadaExitosamente,setCuentaCreadaExitosamente] = useState(false)

    let [error,setError] = useState(false)
    let [textError,setTextError] = useState('')

    let handleOnNombreChange = (e) => {
    let valor = e.target.value;
    setNombre(valor)
    let errorNombre = valor.length > 0 && valor.length < 6;
    setErrorNombre(errorNombre)
    }

    let handleOnEmailChange = (e) => {
        if(e.target.validity.typeMismatch){
            setErrorEmail(true)
            setEmail(e.target.value)
            console.log(errorEmail)
        }else {
            setErrorEmail(false)
            setEmail(e.target.value)}
    }



    let handleOnPasswordChange = (e) =>{
        let valor = e.target.value
        setPassword(valor)

        let passwordsDifieren = confirmPassword === valor

        if(!passwordsDifieren) {setErrorPassword(true)}
        else{
            setErrorPassword((valor.length > 0 && valor.length < 6) )
        }


    }

    let handleOnConfirmPasswordChange = (e) =>{
        let valor = e.target.value
        setConfirmPassword(valor)
        //si contraseñas don't match


        let passwordsMatch = valor === password
        setErrorConfirmPassword(!passwordsMatch)
    }


    const handleOnCloseError = ()=>{
        setError(false)
    }

    const createAccount = () => {
        let rol = "Diseñador"
        const headers = new Headers
        const usuario = {
            nombre:nombre,
            password:password,
            email:email,
            img:'',
            rol:rol,
            estado:true,
            google:false
        }

        headers.set('Content-Type','application/json')

        const init = {
            method:'post',
            headers:headers,
            body:JSON.stringify(usuario)
        }

        fetch(url+'/api/usuarios',init)
            .then(raw => {

                return raw.json()
            }).then(body =>{

                const typeError = body?.errors[0]

                if(typeError){
                    switch (typeError.path){
                        case 'email':
                            setTextError(typeError.msg)
                            setErrorEmail(true)
                            setError(true)
                    }
                    //Comentar despues de pruebas
                    //setCuentaCreadaExitosamente(true)
                }else{
                    setTimeout(redirect,2000)
                    setCuentaCreadaExitosamente(true)
                }
        })

    }


    const redirect = () => navigate('/login')

    let activarRegistro = errorEmail | errorPassword | errorConfirmPassword | errorNombre | !nombre | !password | !email
        | !confirmPassword

    return <>

    <Container >



        <Card sx={{'margin-top':'10%'}} variant={'outlined'}>

                <Typography variant={'h4'} align='center'>
                    Registrate
                </Typography>

            <CardContent>
                <Grid container
                      spacing={4}
                      justifyContent={'center'}
                      alignContent={'center'}
                      direction={'column'}>


                    <Grid item md={12} >
                        <TextField label={'Nombre completo'}
                                   value={nombre}
                                   error={errorNombre}
                                   onChange={handleOnNombreChange}
                                   helperText={errorNombre ? 'El nombre debe tener mas de 6 caracteres': ''}
                                   fullWidth/>
                    </Grid>

                    <Grid item md={12} >
                        <TextField label={'Correo electronico'}
                                   type={'email'}
                                   onChange={handleOnEmailChange}
                                   value={email}
                                   error={errorEmail}
                                   fullWidth/>
                    </Grid>

                    <Grid item md={12}>
                        <TextField label={'Contraseña'}
                                   type={'password'}
                                   onChange={handleOnPasswordChange}
                                   error={errorPassword}
                                   helperText={password?.toString() > 0 & password.toString() < 6?'La contraseña debe tener 6 o mas caracteres':errorPassword?'Las contraseñas no coinciden.':''}
                                   value={password}
                                   fullWidth/>
                    </Grid>

                    <Grid item md={12}>
                        <TextField label={'Confirmar contraseña'}
                                   type={'password'}
                                   onChange={handleOnConfirmPasswordChange}
                                   helperText={errorConfirmPassword ? 'Las contraseñas no coinciden': ''}
                                   error={errorConfirmPassword}
                                   value={confirmPassword}
                                   fullWidth/>
                    </Grid>

                    <Grid item>
                        <Grid container justifyContent={'center'} spacing={2}>

                            <Grid item >
                                <Button
                                    disabled={Boolean(activarRegistro)}
                                    onClick={createAccount}
                                    color={'success'}
                                    variant={'contained'}>Registrarse.</Button>
                            </Grid>


                        </Grid>

                    </Grid>

                </Grid>
            </CardContent>
        </Card>


        <Dialog onClose={()=>navigate('/login')}
            open={cuentaCreadaExitosamente}>
                <Alert>Cuenta creadad exitosamente!</Alert>

        </Dialog>


    <Snackbar autoHideDuration={4000}
        anchorOrigin={{vertical:'top',horizontal:'right'}}
        open={error}
        onClose={handleOnCloseError}>
        <Alert severity={"error"} onClose={()=>setError(false)}>
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
    </>
}