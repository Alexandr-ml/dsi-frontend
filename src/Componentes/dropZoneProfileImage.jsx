import react, {useState} from 'react'
import {Grid} from "@mui/material";
import serverUrl from "../serverUrl.js";
import Tooltip from "@mui/material/Tooltip";


export default function DropZoneProfileImage({imagenUrl,userID}){

    let [auxImgUrl,setAuxImgaUrl] = useState(imagenUrl)

    const handleDroppedImage = e => {
        e.preventDefault()

        let imagen = e.dataTransfer.files[0]

        let formData = new FormData()
        formData.append('archivo',imagen)

        //setImageFile(imagen)
        let fr = new FileReader()

        fr.readAsDataURL(imagen)

        fr.onload = () => {

            fetch(serverUrl+'/api/uploads/'+userID,{
                method:'PUT',
                body:formData,
                redirect:'follow',
            }).then(response => response.json())
                .then(response => {
                    setAuxImgaUrl(response.usuario.img)
                })


            //imagenUrl = 'tmp'
            //setAuxImg(fr.result)
        }

        localStorage.setItem("fotoPerfil",auxImgUrl)

    }

    const handleOnDragEnter = e => {
        e.preventDefault()
        console.log(e)
    }

    const handleChangeImage = () => {
        setAuxImgaUrl('')
    }

    return <>
    <div onDrop={handleDroppedImage} onDragEnter={e=> e.preventDefault()} onDragOver={e=>e.preventDefault()}>


        <Grid container>
            <Grid item md={12}>
                {
                    auxImgUrl ? <Tooltip title={'Click para cambiar foto de perfil.'}>
                            <img src={auxImgUrl}
                                 onClick={handleChangeImage}
                                 width={'150em'} alt={'Foto de perfil'}
                                 style={{'borderRadius':'50%','object-fit':'cover','line-height':'7em'}}
                                 height={'150em'} />
                        </Tooltip>

                        :<div style={{'border':'2px'}}>
                            <p
                                style={{'border':'1px dashed','padding':'1em'}}>Arrastra una imagen para subirla</p>
                        </div>
                }
            </Grid>

        </Grid>


    </div>
    </>
}
