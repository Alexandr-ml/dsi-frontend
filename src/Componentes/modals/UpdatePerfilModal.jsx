import react, {useState} from 'react'
import {CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import serverUrl from "../../serverUrl.js";


export default function UpdatePerfilModal({modalUpdatePerfilOPen,setInfoPersonal,infoPersonal,handleOnClose}){

    let [copyNombre,setCopyNombre] = useState(infoPersonal.nombre)
    let [copyCorreo,setCopyCorreo] = useState(infoPersonal.email)
    let [cargando,setCargando] = useState(false)
    let handleCloseAsCancel = ()=>{
        handleOnClose()
        setCopyCorreo(infoPersonal.email)
        setCopyNombre(infoPersonal.nombre)
    }

    let handleOnChangeNombre = (e) => setCopyNombre(e.target.value)


    let handleOnChangeCorreo = (e) => setCopyCorreo(e.target.value)

    let actualizarDatos =  () =>{


        setCargando(true)
        let rol = "Diseñador"

        const headers = new Headers

        const usuario = {
            nombre:copyNombre,
            email:infoPersonal.email,
            img:infoPersonal.img,
            rol:rol,
            estado:true,
            google:false
        }

        headers.set('Content-Type','application/json')

        const init = {
            method:'put',
            headers:headers,
            body:JSON.stringify(usuario)
        }

        fetch(serverUrl+`/api/usuarios/${infoPersonal.uid}`,init)
            .then(raw => raw.json())
            .then(respuesta =>{
                setCopyNombre(respuesta.nombre)
                setCargando(false)
                handleOnClose()

                let newUser = {
                    uid:infoPersonal.uid,
                    nombre:copyNombre,
                    email:infoPersonal.email,
                    ...respuesta
                }

                setInfoPersonal(newUser)
                localStorage.setItem('nombreUsuario',newUser.nombre)

            })

    }

    return <>
        <Dialog open={modalUpdatePerfilOPen} onClose={handleCloseAsCancel}>
            <DialogTitle>Actualizar informacion personal.</DialogTitle>
            <DialogContent>

                {
                    cargando ? <CircularProgress/>
                        :
                        <Stack spacing={2}>
                        <Typography>Nombre:</Typography>
                        <TextField type="text" value={copyNombre} onChange={handleOnChangeNombre}/>
                    </Stack>

                }

            </DialogContent>

            <DialogActions>
                <Button color="success" onClick={actualizarDatos}>Actualizar.</Button>
                <Button onClick={handleCloseAsCancel}>Cancelar.</Button>
            </DialogActions>
        </Dialog>

    </>


}