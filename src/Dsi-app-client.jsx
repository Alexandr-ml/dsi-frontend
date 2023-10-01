import react from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Autenticación/Login.jsx";
import Inicio from "./pages/Inicio.jsx";
import Proyectos from "./pages/Proyectos/Proyectos.jsx";
import GestionTareas from "./pages/Tareas/GestionTareas.jsx";
import RequireAuth from "./pages/Autenticación/RequireAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Perfil from "./pages/Perfil/Perfil.jsx";
import ListaMisProyectos from "./pages/Proyectos/ListaMisProyectos.jsx";
import Proyecto from "./pages/Proyectos/Proyecto.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es-mx.js'
import Tareas from "./pages/Tareas/ListaMisTareas.jsx";
import EditarTarea from "./pages/Tareas/Tarea.jsx";
import Registro from "./pages/Autenticación/Registro.jsx";
import Index from "./pages/Index.jsx";

export const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es-mx'}>
          <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Index/>}/>
                <Route path ={"/login"} element={<Login/>}></Route>
                <Route path={"/registro"} element={<Registro/>}/>
                <Route element={<RequireAuth isLogged={localStorage.getItem("isLogged") === "true"}/> } >
                    <Route path={"/dashboard"} element={<Dashboard><Inicio/></Dashboard>}></Route>
                    <Route path = {"/proyectos"} element={<Dashboard><Proyectos/></Dashboard>}></Route>
                    <Route path={"/mistareas"} element={<Dashboard><Tareas/></Dashboard>}></Route>
                    <Route path={"/mistareas/tarea"} element={<Dashboard><EditarTarea/></Dashboard>}/>
                    <Route path={"/mistareas/tarea/:id/editar"} element={<Dashboard><EditarTarea/></Dashboard>}/>
                    <Route path={"/perfil"} element={<Dashboard><Perfil/></Dashboard>}/>
                    <Route path={'/misproyectos'} element={<Dashboard><ListaMisProyectos/></Dashboard>}/>
                    <Route path={'/misproyectos/proyecto'} element={<Dashboard><Proyecto/></Dashboard>}/>
                    <Route path={'/misproyectos/proyecto/:id/editar'} element={<Dashboard><Proyecto/></Dashboard>} />
                </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
    );
};

