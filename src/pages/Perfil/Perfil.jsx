import react, {useEffect, useState} from 'react'

import Avatar from "@mui/material/Avatar";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import url from "../../serverUrl.js";
import PerfilCardBasic from "../../Componentes/PerfilCardBasic.jsx";
import Loading from "../../Componentes/Loading.jsx";
import Button from "@mui/material/Button";
import UpdatePerfilModal from "../../Componentes/modals/UpdatePerfilModal.jsx";


function Perfil(){
    let [informacionPersonal,setInformacionPersonal] = useState();
    let [modalEditarPerfilOpen,setModalEditarPerfilOpen] = useState(false)
    let [modalEliminarCuentaOpen,setModalEliminarCuentaOpen] = useState(false)



    let headers = new Headers
    headers.append("x-token", sessionStorage.getItem("token"));
    headers.append("Content-Type", "application/json");

    let handleDialogActualizarInformacion = () => {
        setModalEditarPerfilOpen(false)
    }

    let handleDialogEliminarCuenta = ()=>{
        setModalEliminarCuentaOpen(false)
    }

    useEffect ( () => {
        fetch( url+'/api/usuarios/'+localStorage.getItem('uid'),{
            method: 'get',
            headers:headers,
        }).then( responseRaw => responseRaw.json())
            .then(response => {
                //console.log(response.usuario)
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

        />

        <Dialog open={modalEliminarCuentaOpen} onClose={handleDialogEliminarCuenta}>
            <DialogTitle>Desea eliminar su cuenta?</DialogTitle>
            <DialogContent>
                <Typography>Realmente desea eliminar su cuenta?</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleDialogEliminarCuenta}>Cancelar.</Button>
                <Button color={'error'}>Eliminar.</Button>
            </DialogActions>
        </Dialog>


    <UpdatePerfilModal
        infoPersonal={informacionPersonal}
        setInfoPersonal={setInformacionPersonal}
        handleOnClose={handleDialogActualizarInformacion}
        modalUpdatePerfilOPen={modalEditarPerfilOpen}/>

    </>
}

export default Perfil;