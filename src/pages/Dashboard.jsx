import react from 'react'
import ResponsiveAppBar from "../Componentes/ResponsiveAppBar.jsx";
import Container from "@mui/material/Container";
import {Outlet} from "react-router";
import Footer from "./Footer/footer.jsx";


export default function Dashboard({children}){

    return <>
        <ResponsiveAppBar/>
        <Container sx={{mt:2}} style={{backgroundColor:'white'}}>{children}</Container>
    </>

}