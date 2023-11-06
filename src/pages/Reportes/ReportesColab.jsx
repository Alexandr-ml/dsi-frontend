import React, { useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import "../../styles/reporte.css"

import serverUrl from "../../serverUrl.js";

const ReportColab = () => {
    const headers = new Headers
    headers.set("x-token", sessionStorage.getItem("token"))
    var id = localStorage.getItem("uid")

    const initGetColab = {
        headers: headers,
        method: "GET",
    }

    const [listColaboradores, setListColaboradores] = useState([])
    const [proyectos, setProyectos] = useState([])
    const [tareas, setTareas] = useState([])
    const [colabUnicos, setColabUnicos] = useState()
    const [usuariosOcupados, setUsuariosOcupados] = useState([])
    const [cantOcupados, setCantOcupados] = useState(0)
    const [cantLibres, setCantLibres] = useState(0)


    useEffect(() => {
        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/colaboradores/" + id, initGetColab)
            .then(rawResponse => rawResponse.json()
                .then(result => {
                    setListColaboradores(result)
                }))
        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/", initGetColab)
            .then(rawResponse => rawResponse.json()
                .then(result => {
                    setTareas(result.tareas)
                }))
        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/creador/" + id, initGetColab)
            .then(rawResponse => rawResponse.json())
            .then((response) => {
                const proyectos = response.proyectos
                setProyectos(proyectos)

            })
    }, []);

    useEffect(() => {
        let idsProyectos = proyectos.map(proyecto => proyecto.uid)
        let tareasFiltrada = tareas.filter(tarea => idsProyectos.includes(tarea.proyecto._id))
        const usuarioUnicos = listColaboradores.filter((usuario, index, self) =>
            index === self.findIndex(u => u.uid === usuario.uid)
        )
        const usuariosTareas = usuarioUnicos.map(usuario => {
            const tareasAsignadas = tareasFiltrada.filter(tarea => tarea.asignados.nombre === usuario.nombre);
            return {
                ...usuario,
                tieneTareas: tareasAsignadas.length > 0
            }
        })
        console.log(usuariosTareas)
        const ocupados = usuariosTareas.filter(usuario => usuario.tieneTareas = true)
        const libres = usuariosTareas.filter(usuario => !usuario.tieneTareas)
        setCantOcupados(ocupados.length)
        setCantLibres(libres.length)
        setUsuariosOcupados(usuariosTareas)

    }, [listColaboradores, tareas, proyectos]);


    const dataEstado = {
        labels: [
            'Ocupado',
            'Libre'
        ],
        datasets: [{
            data: [cantOcupados, cantLibres],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
        }]
    };
    const dataTareas = {
        labels: [
            '1% - 33%',
            '34% - 66%',
            '67% - 99%'
        ],
        datasets: [{
            data: [5, 11, 2],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    const dataRendimiento = {
        labels: [
            '1% - 33%',
            '34% - 66%',
            '67% - 99%'
        ],
        datasets: [{
            data: [5, 11, 2],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

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
            label: 'Estado',
            content: <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <Doughnut data={dataEstado} options={options} />
                    </div>
                    <div>
                        <Bar data={dataEstado} options={optionsBar} />
                    </div>
                </div>
                {usuariosOcupados ? <>
                    <div>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ textAlign: 'center' }}>Colaborador</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usuariosOcupados.map((fila, index) => (
                                        <TableRow key={index}>
                                            <TableCell style={{ border: 'none', textAlign: 'center' }}>{fila.nombre}</TableCell>
                                            <TableCell style={{ border: 'none', textAlign: 'center' }}>{fila.tieneTareas ? 'Ocupado' : 'Libre'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div></> : <div align={'center'}><CircularProgress /></div>}
            </div>
        },
        /*{
            label: 'Rendimiento',
            content: <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <Doughnut data={dataRendimiento} options={options} />
                    </div>
                    <div>
                        <Bar data={dataRendimiento} options={optionsBar} />
                    </div>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'center' }}>Colaborador</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>No iniciadas</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>En progreso</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Finalizadas</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>% finalizadas</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'center' }}>Colaborador 1</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>2</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>1</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>3</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>50 %</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        }*/
    ];


    return <>
        <h2 style={{ textAlign: 'center' }}>Reporte de Colaboradores</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Tabs tabs={tabData} />
        </div>

    </>
};

export default ReportColab;
