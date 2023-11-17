import react from 'react'
import { useState } from 'react'
import { AlertTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";
import AppBarIndex from '../../Componentes/AppBarLogin.jsx';
import { Dialog, DialogContent, DialogTitle, Grid, Typography, Alert,Snackbar } from '@mui/material';




function autenticar(email, password) {

    let body = { email: email, password: password }
    let r;
    try {
        r = fetch(url + "/api/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (error) {
        console.log(error.message)
    }

    return r;

}


export default function Login() {
    const [aut, setAut] = useState(false)
    const navigate = useNavigate()
    let [errorEmail, setErrorEmail] = useState(false)
    let [errorPassword, setErrorPassword] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const handleModalProjectCreated = () => {
        setAut(false)
    }

    return <>
        <AppBarIndex />
        <div className='loginCont' style={{width:'100vw', height:'100vh'}}>
            <form className="formLogin" style={{ width: "70vw", maxWidth:'650px' }} id={"loginForm"}>
                <h2>Iniciar Sesión</h2>
                <div className="form-outline mb-4">
                    <TextField type="email"
                        required
                        pattern={"email"}
                        error={errorEmail}
                        className="form-control form-control-lg"
                        helperText={errorEmail ? "Ingrese una direccion valida" : ""}
                        onChange={e => {
                            if (e.target.validity.typeMismatch) {
                                setErrorEmail(true)
                                console.log(errorEmail)
                            } else {
                                setErrorEmail(false)
                                setEmail(e.target.value)
                            }
                        }
                        }
                        label={"Correo electronico"}
                    />
                </div>
                <div className="form-outline mb-4">
                    <TextField type="password"
                        required
                        error={errorPassword}
                        helperText={errorPassword ? "Debe poseer 6 o más caracteres" : ""}
                        inputProps={{ minLength: 6 }}
                        onChange={e => {
                            if (e.target.validity.tooShort) {
                                setErrorPassword(true)
                            } else {
                                setErrorPassword(false)
                                setPassword(e.target.value)
                            }
                        }
                        }
                        className="form-control form-control-lg"
                        label={"Contraseña"} />
                </div>
                <div className="pt-1 mb-4">
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            autenticar(email, password)
                                .then(response => response.ok ? response.json() : 0)
                                .then(res => {
                                    if (res) {
                                        console.log(res)
                                        localStorage.setItem("uid", res.usuario.uid)
                                        localStorage.setItem("usuario", res.usuario)
                                        sessionStorage.setItem("token", res.token)
                                        localStorage.setItem("isLogged", true)
                                        localStorage.setItem("nombreUsuario", res.usuario.nombre)
                                        localStorage.setItem('fotoPerfil', res.usuario.img)
                                        console.log(res)
                                        window.location = window.location.href.replace("login", "dashboard")
                                    } else {
                                        setAut(true)
                                        setEmail("");
                                        setPassword("");
                                    }
                                }).catch(error => {
                                })
                        }}
                        variant={'contained'}
                    >Ingresar</Button>
                </div>
                <p style={{ padding: 0, margin: 0, fontWeight: 500 }}>¿No tienes cuenta?</p>
                <Button onClick={() => navigate('/registro')} style={{ padding: 0, margin: 0, fontWeight: 500 }}>
                    Crear cuenta
                </Button>
            </form>
        </div>
        <Snackbar open={aut} autoHideDuration={6000} onClose={handleModalProjectCreated} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
            <Alert onClose={handleModalProjectCreated} severity="error" variant="filled">
                <AlertTitle>Error al ingresar</AlertTitle>
                Compruebe su correo y/o contraseña
            </Alert>
        </Snackbar>


    </>
}