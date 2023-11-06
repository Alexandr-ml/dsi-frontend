import {Alert, Dialog, DialogActions, DialogContent, Snackbar, TextField} from "@mui/material";
import React, {useState} from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import serverUrl from "../../serverUrl.js";
import Button from "@mui/material/Button";



function UpdatePasswordModal({user,isOpen,closingAction,setUser}){
    const [newPassword,setNewPassword] = useState()
    const [currentPassword,setCurrentPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const [passwordUpdatedSuccess,setPasswordUpdateSuccess] = useState(false)
    const [passwordsMatch,setPasswordsMatch] = useState(false)


    const handleChangeNewPass = (e) => setNewPassword(e.target.value)
    const handleChangeConfirm = (e) => {

        const confirmPassword = e.target.value
        setConfirmPassword(confirmPassword)

        if(confirmPassword === newPassword && confirmPassword !== ''){

            setPasswordsMatch(true)
        }
    }

    const updatePassword = () => {

        let rol = "Diseñador"

        const headers = new Headers

        const usuario = {
            password:newPassword,
            ...user
        }

        headers.set('Content-Type', 'application/json')

        const init = {
            method: 'put',
            headers: headers,
            body: JSON.stringify(usuario)
        }

        console.log(usuario)

        fetch(serverUrl+`/api/usuarios/${user.uid}`,init)
            .then(raw => raw.json())
            .then(respuesta =>{

                setConfirmPassword('')
                setNewPassword('')
                setPasswordUpdateSuccess(true)
                closingAction()

            })

    }

    return <>

    <Dialog onClose={closingAction} open={isOpen}>

        <DialogContent>
          <Stack>
              <Typography>Nueva contraseña.</Typography>
              <TextField value={newPassword} onChange={handleChangeNewPass}
                  type={'password'}/>
              <Typography>Confirmar nueva contraseña.</Typography>
              <TextField value={confirmPassword} onChange={handleChangeConfirm}
                  type={'password'}/>
          </Stack>
        </DialogContent>

        <DialogActions>
            <Button disabled={!passwordsMatch}
                onClick={updatePassword}>Cambiar contraseña.</Button>
        </DialogActions>
    </Dialog>

        <Snackbar open={passwordUpdatedSuccess} autoHideDuration={1000} anchorOrigin={{vertical:'top',horizontal:"center"}} onClose={()=>setPasswordUpdateSuccess(false)}>
            <Alert severity={'success'}>Se actualizo la contraseña.</Alert>
        </Snackbar>

    </>

}

export default UpdatePasswordModal;