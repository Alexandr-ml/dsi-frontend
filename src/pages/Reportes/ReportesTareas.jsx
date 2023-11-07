import React, { useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress, useStepContext } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import "../../styles/reporte.css"
import serverUrl from "../../serverUrl.js";

const ReportTareas = () => {
    const headers = new Headers
    headers.set("x-token", sessionStorage.getItem("token"))
    var id = localStorage.getItem("uid")

    const initGetTareas = {
        headers: headers,
        method: "GET",
    }

    let [listaTareas, setListaTareas] = useState([])
    let [listaProyectos, setListaProyectos] = useState([])
    const [tareasNoIniciadas, setTareasNoIniciadas] = useState([])
    const [tareasEnProgreso, setTareasEnProgreso] = useState([])
    const [tareasFinalizadas, setTareasFinalizadas] = useState([])
    const [cantTarFinalizadas, setCantTaFinalizadas] = useState(0)
    const [cantTarNoIni, setCantTarNoIni] = useState(0)
    const [cantTarProgreso, setCantTarProgreso] = useState(0)
    const [tareasFiltradas, setTareasFiltradas] = useState()




    useEffect(() => {
        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas", initGetTareas)
            .then(rawResponse => rawResponse.json())
            .then((response) => {
                const tareas = response.tareas
                setListaTareas(tareas)
            })

        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/creador/" + id, initGetTareas)
            .then(rawResponse => rawResponse.json())
            .then((response) => {
                const proyectos = response.proyectos
                setListaProyectos(proyectos)
                console.log(listaTareas)
            })
    }, [])

    useEffect(()=>{
        let idsProyectos = listaProyectos.map(proyecto => proyecto.uid)
        let tareasFiltrada = listaTareas.filter(tarea => idsProyectos.includes(tarea.proyecto._id))
        setTareasFiltradas(tareasFiltrada)
        let tareasNoIniciadasAux = tareasFiltrada.filter(valor => valor.estado_Tarea === 'No iniciado')
        let tareasFinalizadasAux = tareasFiltrada.filter(valor => valor.estado_Tarea === 'Finalizado')
        let tareasEnProgresoAux = tareasFiltrada.filter(valor => valor.estado_Tarea === 'En proceso')
        setTareasEnProgreso(tareasEnProgresoAux)
        setTareasNoIniciadas(tareasNoIniciadasAux)
        setTareasFinalizadas(tareasFinalizadasAux)
        setCantTaFinalizadas(tareasFinalizadasAux.length)
        setCantTarNoIni(tareasNoIniciadasAux.length)
        setCantTarProgreso(tareasEnProgresoAux.length)
    }, [listaTareas, listaProyectos])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'black',
                    fontSize: 14,
                },
            },
        },
    }

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    fontColor: 'black',
                    fontSize: 14,
                },
            },
        },
    }

    const data = {
        labels: [
            'No iniciado',
            'En progreso',
            'Finalizado'
        ],
        datasets: [{
            data: [cantTarNoIni, cantTarProgreso, cantTarFinalizadas],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const Tabs = ({ tabs }) => {
        const [activeTab, setActiveTab] = useState(0);

        const handleTabClick = (index) => {
            setActiveTab(index);
        };

        return (
            <div className="tabs-container">
                <div className="tab-buttons">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`tab-button ${index === activeTab ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <div className="tab-content">
                    {tabs[activeTab].content}
                </div>
            </div>
        );
    };

    const tabData = [
        {
            label: 'Anillo',
            content: <div className="grafico">
                {listaTareas && <>
                    <Doughnut data={data} options={options} />
                </>}
            </div>
        },
        {
            label: 'Barras',
            content: <div className="grafico">
                <Bar data={data} options={optionsBar} />
            </div>
        }
    ];



    return <>
        {tareasEnProgreso ? <>
            <h2 style={{ textAlign: 'center' }}>Reporte de Tareas</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Tabs tabs={tabData} />
            </div>
            <br></br>
            <div style={{ display: 'flex' }}>
                <TableContainer component={'div'}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center' , background:'#214A87', color:'white'  }}>No iniciados</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tareasNoIniciadas.map((fila, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ border: 'none' }}>{fila.nombre}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={'div'}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center', background:'#214A87', color:'white'  }}>En progreso</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tareasEnProgreso.map((fila, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ border: 'none' }}>{fila.nombre}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={'div'}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center', background:'#214A87', color:'white'  }}>Finalizados</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tareasFinalizadas.map((fila, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ border: 'none' }}>{fila.nombre}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div></> : <div align={'center'}><CircularProgress /></div>}
            <br></br>
    </>
};

export default ReportTareas;