import react, {useEffect, useState} from 'react'

import Avatar from "@mui/material/Avatar";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import url from "../../serverUrl.js";
import PerfilCardBasic from "../../Componentes/PerfilCardBasic.jsx";
import Loading from "../../Componentes/Loading.jsx";
import Button from "@mui/material/Button";
import UpdatePerfilModal from "../../Componentes/modals/UpdatePerfilModal.jsx";
import UpdatePasswordModal from "../../Componentes/modals/UpdatePasswordModal.jsx";
import { Navigate, useNavigate } from 'react-router-dom';



function Perfil(){
    let [informacionPersonal,setInformacionPersonal] = useState();
    let [modalEditarPerfilOpen,setModalEditarPerfilOpen] = useState(false)
    let [modalEliminarCuentaOpen,setModalEliminarCuentaOpen] = useState(false)
    let [modalUpdatePasswordOpen,setModalUpdatePasswordOpen] = useState(false)
    let navigate = useNavigate()
    let headers = new Headers
    headers.append("x-token", sessionStorage.getItem("token"));
    headers.append("Content-Type", "application/json");

    let handleDialogActualizarInformacion = () => {
        setModalEditarPerfilOpen(false)
    }

    let handleDialogEliminarCuenta = ()=>{
        setModalEliminarCuentaOpen(false)
    }

    let handleDialogUpdatePassword = () =>{
        setModalUpdatePasswordOpen(false)
    }

    useEffect ( () => {
        fetch( url+'/api/usuarios/'+localStorage.getItem('uid'),{
            method: 'get',
            headers:headers,
        }).then( responseRaw => responseRaw.json())
            .then(response => {
                console.log(response.usuario)
                setInformacionPersonal(response.usuario)
            } )

    },[])

    if(!informacionPersonal){
        return <>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <Loading/>
                </Grid>
            </Grid>
        </>
    }

    return <>
        <PerfilCardBasic
            info={informacionPersonal}
            openDialogEliminarCuenta={setModalEliminarCuentaOpen}
            openDialogActualizarInfo={setModalEditarPerfilOpen}
            openDialogUpdatePassword={setModalUpdatePasswordOpen}

        />

        <Dialog open={modalEliminarCuentaOpen} onClose={handleDialogEliminarCuenta} >
            <DialogTitle align='center' style={{backgroundColor:'#214A87', color:'white'}}>¿Eliminar cuenta?</DialogTitle>
            <DialogContent style={{backgroundColor:'#214A87', color:'white'}}>
                <Typography>Esta acción no se puede revertir</Typography>
            </DialogContent>

            <DialogActions style={{display:'flex', justifyContent:'center', backgroundColor:'#214A87'}}>
                <Button variant='contained' style={{backgroundColor:'white', color:'#214A87'}} onClick={handleDialogEliminarCuenta}>Cancelar</Button>
                <Button variant='contained' color={'error'} onClick={()=>{
                    const headers = new Headers();
                    headers.set("x-token", sessionStorage.getItem("token"))
                    const initBorrarTarea = {
                        method: 'DELETE',
                        headers: headers,
                    }
                    let id = localStorage.getItem("uid")
                    fetch(url + "/api/usuarios/" + id, initBorrarTarea)
                    navigate("/login")
                }}>Eliminar</Button>
            </DialogActions>
        </Dialog>


    <UpdatePerfilModal
        infoPersonal={informacionPersonal}
        setInfoPersonal={setInformacionPersonal}
        handleOnClose={handleDialogActualizarInformacion}
        modalUpdatePerfilOPen={modalEditarPerfilOpen}
    />

    <UpdatePasswordModal
        isOpen={modalUpdatePasswordOpen}
        closingAction={handleDialogUpdatePassword}
        user={informacionPersonal}
        setUser={setInformacionPersonal}
    />
    </>
}

export default Perfil;