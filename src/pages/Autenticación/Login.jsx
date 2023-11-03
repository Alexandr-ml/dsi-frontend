import react from 'react'
import { useState } from 'react'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";
import "../../styles/login.css"



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
    const navigate = useNavigate()
    let [errorEmail, setErrorEmail] = useState(false)
    let [errorPassword, setErrorPassword] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    return <>

        <div className='loginCont'>
            <form className="formLogin" style={{ width: "35em" }} id={"loginForm"}>
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
                                        console.log(res.usuario)
                                        localStorage.setItem("uid", res.usuario.uid)
                                        localStorage.setItem("usuario", res.usuario)
                                        sessionStorage.setItem("token", res.token)
                                        localStorage.setItem("isLogged", true)
                                        localStorage.setItem("nombreUsuario", res.usuario.nombre)
                                        localStorage.setItem('fotoPerfil',res.usuario.img)
                                        console.log(res)
                                        window.location = window.location.href.replace("login", "dashboard")
                                    } else {
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
    </>
}