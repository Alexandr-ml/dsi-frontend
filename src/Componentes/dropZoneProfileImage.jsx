import react, { useState } from 'react'
import { Grid } from "@mui/material";
import serverUrl from "../serverUrl.js";
import Tooltip from "@mui/material/Tooltip";
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';


export default function DropZoneProfileImage({ imagenUrl, userID }) {

    let [auxImgUrl, setAuxImgaUrl] = useState(imagenUrl)

    const handleDroppedImage = e => {
        e.preventDefault()

        let imagen = e.dataTransfer.files[0]

        let formData = new FormData()
        formData.append('archivo', imagen)

        //setImageFile(imagen)
        let fr = new FileReader()

        fr.readAsDataURL(imagen)

        fr.onload = () => {

            fetch(serverUrl + '/api/uploads/' + userID, {
                method: 'PUT',
                body: formData,
                redirect: 'follow',
            }).then(response => response.json())
                .then(response => {
                    setAuxImgaUrl(response.usuario.img)
                })


            //imagenUrl = 'tmp'
            //setAuxImg(fr.result)
        }

    }

    const handleOnDragEnter = e => {
        e.preventDefault()
        console.log(e)
    }

    const handleChangeImage = () => {
        setAuxImgaUrl('')
    }

    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleCancelar = () => {
        setAuxImgaUrl(imagenUrl)
    }

    const contenedorStyle = {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer'
    };

    const textoStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '50%',
        pointerEvents: 'none', 
        display: hovered ? 'block' : 'none',
        width: '100%',
        height: '100%',
    };

    const texto = {
        position: 'absolute',
        top: '30%',
        left: '0%',
        width: '100%'
    }

    const imagen = {
        position: 'absolute',
        top: '50%',
        left: '0%',
        width: '100%'
    }


    return <>
        <div onDrop={handleDroppedImage} onDragEnter={e => e.preventDefault()} onDragOver={e => e.preventDefault()}>


            <Grid container>
                <Grid item md={12}>
                    {
                        auxImgUrl ?
                            <Tooltip style={contenedorStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <img src={auxImgUrl}
                                    onClick={handleChangeImage}
                                    width={'150em'} alt={'Foto de perfil'}
                                    style={{ 'borderRadius': '50%', 'object-fit': 'cover', 'line-height': '7em' }}
                                    height={'150em'} />
                                <div style={textoStyle}>
                                    <p style={texto}>CAMBIAR IMAGEN</p>
                                    <ImageIcon style={imagen}></ImageIcon>
                                </div>

                            </Tooltip>

                            : <div style={{ 'border': '2px', padding:'5%' }}>
                                <p style={{ 'border': '1px dashed', 'padding': '0.8em' }}>Arrastra una imagen para subirla</p>
                                <Button variant='contained' style={{backgroundColor:'white', border:'none', color:'#214A87', marginBottom:'5%'}}
                                onClick={handleCancelar}>Cancelar</Button>
                            </div>
                    }
                </Grid>

            </Grid>


        </div>
    </>
}