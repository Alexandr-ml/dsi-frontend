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
            password:inforPersonal.password,
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

                console.log(newUser)
                setInfoPersonal(newUser)
                localStorage.setItem('nombreUsuario',newUser.nombre)

            })

    }

    return <>
        <Dialog open={modalUpdatePerfilOPen} onClose={handleCloseAsCancel}>
            <DialogTitle  style={{backgroundColor:'#214A87', color: 'white'}}>Actualizar informacion personal</DialogTitle>
            <DialogContent  style={{backgroundColor:'#214A87', color: 'white', padding:'4%'}}>

                {
                    cargando ? <CircularProgress/>
                        :
                        <div style={{display:'flex', alignContent:'center', justifyContent:'center', color:'white'}}>
                            <TextField label='Nombre' type="text" value={copyNombre} onChange={handleOnChangeNombre}/>
                        </div>

                }

            </DialogContent>

            <div style={{backgroundColor:'#214A87', width:'100%', alignSelf:'center', padding:'2%', display:'flex', justifyContent:'center'}}>
                <Button variant='contained' color="success" onClick={actualizarDatos} style={{margin:'2%'}}>Actualizar</Button>
                <Button variant='contained' color='error' onClick={handleCloseAsCancel} style={{margin:'2%'}}>Cancelar</Button>
            </div>
        </Dialog>

    </>


}