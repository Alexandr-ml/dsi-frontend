import react from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Autenticación/Login.jsx";
import Inicio from "./pages/Inicio.jsx";
import Proyectos from "./pages/Proyectos/Proyectos.jsx";
import DetalleProyecto from "./pages/Proyectos/DetalleProyecto.jsx";
import RequireAuth from "./pages/Autenticación/RequireAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Autenticación/Register.jsx";
import Perfil from "./pages/Perfil/Perfil.jsx";
import ListaMisProyectos from "./pages/Proyectos/ListaMisProyectos.jsx";
import Proyecto from "./pages/Proyectos/Proyecto.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es-mx.js'
import EditarTarea from "./pages/Tareas/Tarea.jsx";
import Index from "./pages/Index.jsx";
import Tareas from "./pages/Tareas/ListaMisTareas.jsx";
import MisTareas from "./pages/Tareas/MisTareas.jsx";
import Registro from "./pages/Autenticación/Registro.jsx";
import MisReportes from "./pages/Reportes/MisReportes.jsx";
import ReportColab from "./pages/Reportes/ReportesColab.jsx";
import ReportProyectos from "./pages/Reportes/ReportesProyectos.jsx";
import ReportTareas from "./pages/Reportes/ReportesTareas.jsx";
import CrearTarea from "./pages/Tareas/CrearTarea.jsx"
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
                        <Route path={'/mistareas'} element={<Dashboard><MisTareas/></Dashboard>}/>
                        <Route path={"/misproyectos/proyecto/consultar/:id"} element={<Dashboard><DetalleProyecto/></Dashboard>}></Route>
                        <Route path={"/mistareas/tarea"} element={<Dashboard><EditarTarea/></Dashboard>}/>
                        <Route path={"/mistareas/tarea/:id/editar"} element={<Dashboard><EditarTarea/></Dashboard>}/>
                        <Route path={"/perfil"} element={<Dashboard><Perfil/></Dashboard>}/>
                        <Route path={'/misproyectos'} element={<Dashboard><ListaMisProyectos/></Dashboard>}/>
                        <Route path={'/misproyectos/proyecto'} element={<Dashboard><Proyecto/></Dashboard>}/>
                        <Route path={'/misproyectos/proyecto/:id/editar'} element={<Dashboard><Proyecto/></Dashboard>} />
                        <Route path={"/misinformes"} element={<Dashboard><MisReportes/></Dashboard>} />
                        <Route path={"/reportcolab"} element={<Dashboard><ReportColab/></Dashboard>}/>
                        <Route path={"/reportproy"} element={<Dashboard><ReportProyectos/></Dashboard>}/>
                        <Route path={"/reporttareas"} element={<Dashboard><ReportTareas/></Dashboard>}/>
                        <Route path={"mistareas/creartarea/:id"} element={<Dashboard><CrearTarea/></Dashboard>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </LocalizationProvider>
    );
};