import react from 'react'
import { CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";


export default function Loading() {

    return <>
        <Container style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '60vh'}}>
            <CircularProgress size={100}/>
        </Container>
    </>

}