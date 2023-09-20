import react from 'react'
import { useState } from 'react'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";
import AppBarLogin from '../../Componentes/AppBar.jsx';



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

        <AppBarLogin />

        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 text-black">


                        <div className="d-flex align-items-center  px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                            <form style={{ width: "35em" }} id={"loginForm"}>


                                <h3 className="fw-normal mb-3 pb-3">Inicio de sesión</h3>

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
                                                        console.log(res)
                                                        window.location = window.location.href.replace("login", "dashboard")

                                                    } else {

                                                    }
                                                }).catch(error => {

                                                })
                                        }}
                                        variant={'contained'}
                                    >Ingresar</Button>

                                    <Button onClick={() => navigate('/registro')}>
                                        Crear cuenta.
                                    </Button>
                                </div>

                            </form>

                        </div>

                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">

                        <section className={"w-100 vh-100"} style={{ backgroundColor: "#214A87" }}></section>
                    </div>
                </div>
            </div>
        </section>
    </>
}