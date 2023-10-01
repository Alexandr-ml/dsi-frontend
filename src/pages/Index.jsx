import React from 'react'
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';

import AppBarIndex from '../Componentes/AppBarIndex';
import "../styles/index.css";


function Index() {

    return (
        <>
            <AppBarIndex />
            <section className="top">
                <div className="title">
                    <h1>SGDP</h1>
                </div>
                <div className='title'>
                    <h3>Sistema Gestor de Proyectos</h3>
                </div>
            </section>
            <section className="page">
                <div className="parallax1"></div>
                <div className="paragraph first">
                    <h3><b>¿Qué es SGDP?</b></h3>
                    <p><span>E</span>l sitio web de nuestro Sistema Gestor de Proyectos, concebido como parte de nuestro proyecto para la materia Diseño de Sistemas, es la puerta de entrada a una solución simple pero eficiente para la gestión de proyectos. Nuestra plataforma combina los conocimientos adquiridos en la materia con tecnologías a la vanguardia para brindar a los usuarios una experiencia de gestión de proyectos sin complicaciones.</p>
                    <p>Las tecnologías utilizadas para nuestro proyecto son: </p>
                    <Box className='container'>
                        <div className='item'>
                            <h5>FrontEnd</h5>
                            <a href='https://es.react.dev/' target='_blank' style={{ textDecoration: "none" }}>
                                <img className='image' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695979694/ImagenesGestor/index/vrnyq10ggf2myy0xk2xw.png" alt='react' />
                                <p>React</p>
                            </a>
                        </div>
                        <div className='item'>
                            <h5>BackEnd</h5>
                            <a href='https://nodejs.org/es' target='_blank' style={{ textDecoration: "none" }}>
                                <img className='image' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695979694/ImagenesGestor/index/kirblzxmls9fm1hyf1hh.png" alt='node js' />
                                <p>Node JS</p>
                            </a>
                        </div>
                        <div className='item'>
                            <h5>Base de Datos</h5>
                            <a href='https://www.mongodb.com/es' target='_blank' style={{ textDecoration: "none" }}>
                                <img className='image' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695979694/ImagenesGestor/index/dgicdp7z85zdzwwcuxyc.png" alt='mongo db' />
                                <p>Mongo DB</p>
                            </a>
                        </div>
                        <div className='item'>
                            <h5>Servidor</h5>
                            <a href='https://railway.app/' target='_blank' style={{ textDecoration: "none" }}>
                                <img className='image' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695979694/ImagenesGestor/index/ihkvs4t6vt8k7ctutvxt.svg" alt='railway' />
                                <p>Railway</p>
                            </a>
                        </div>
                    </Box>
                </div>
                <div className="parallax2">
                    <div className="overlay"></div>
                </div>
                <div className="paragraph second">
                    <h2><b>Funcionalidades</b></h2>
                    <Box className='container'>
                        <div className='itemCol'>
                            <img className='imageFun' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695942222/ImagenesGestor/index/pf84wmlmdkcndvbczpqf.png" />
                            <h5>Tareas</h5>
                        </div>
                        <div className='itemCol'>
                            <img className='imageFun' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695942222/ImagenesGestor/index/moncai3hrzeoxdurtovt.png" />
                            <h5>Proyectos</h5>
                        </div>
                        <div className='itemCol'>
                            <img className='imageFun' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695942222/ImagenesGestor/index/syg5xlzku33n3pcmdvix.png" />
                            <h5>Reportes</h5>
                        </div>
                        <div className='itemCol'>
                            <img className='imageFun' src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695942222/ImagenesGestor/index/xfmry4ritlilmhfuvxjl.png" />
                        </div>
                    </Box>
                </div>
                <div className="parallax3"></div>
                <div className="paragraph third">
                    <h2><b>Sobre Nosotros</b></h2>
                    <p><span>S</span>omos un equipo de cuatro apasionados estudiantes de la carrera de Ingeniería en Sistemas Informáticos de la Universidad de El Salvador. Nos enorgullece presentarles nuestro proyecto integrador, un Sistema Gestor de Proyectos que hemos desarrollado con dedicación y compromiso como parte de nuestra materia de Diseño de Sistemas.</p>
                    <p>Nuestra misión es ofrecer una solución eficiente y efectiva para la gestión de proyectos, brindando herramientas que faciliten la planificación, seguimiento y control de todas las etapas involucradas en la ejecución de proyectos, desde la concepción hasta la entrega final. Sabemos lo desafiante que puede ser llevar a cabo proyectos exitosos, y nuestro sistema está diseñado para simplificar este proceso y maximizar los resultados.</p>
                    <p>Lo que nos hace únicos es nuestra combinación de conocimientos técnicos, creatividad y pasión por la tecnología. Hemos trabajado incansablemente para crear una plataforma intuitiva y completa que se adapte a las necesidades de cualquier proyecto, independientemente de su tamaño o complejidad.</p>
                    <Box className='container'>
                        <div className='itemCol'>
                            <img className='imageFun' src='https://res.cloudinary.com/dykkzngwd/image/upload/v1695269334/usuarios/lgjig3jo85e3alcpsm6f.jpg' />
                            <h5>Katerin Angel</h5>
                            <p>Desarrollador FrontEnd</p>
                        </div>
                        <div className='itemCol'>
                            <img className='imageFun' src='https://res.cloudinary.com/dykkzngwd/image/upload/v1696007434/usuarios/kumhwy0czw30fev2ceaq.jpg' />
                            <h5>Herbert Chicas</h5>
                            <p>Desarrollador FrontEnd</p>
                        </div>
                        <div className='itemCol'>
                            <img className='imageFun' src='https://res.cloudinary.com/dykkzngwd/image/upload/v1695266222/usuarios/jz71cvul53kdg9yzqbnr.jpg' />
                            <h5>Jeffry Mejia</h5>
                            <p>Desarrollador FrontEnd</p>
                        </div>
                        <div className='itemCol'>
                            <img className='imageFun' src='https://res.cloudinary.com/dykkzngwd/image/upload/v1695091997/usuarios/500x500_g5tu6a.jpg' />
                            <h5>Kevin Villalta</h5>
                            <p>Desarrollador BackEnd</p>
                        </div>
                    </Box>
                </div>
                <div className="parallax4"></div>
                <div className="paragraph fourth">
                    <h3><b>Nuestra Historia</b></h3>
                    <Box
                        component="img"
                        sx={{ height: 250 }}
                        alt="UES"
                        src="https://res.cloudinary.com/dykkzngwd/image/upload/v1695979694/ImagenesGestor/index/ty47ueqqc4z5ykfsax71.png"
                    />
                    <p><span>T</span>odo comenzó en un reunión de la Universidad de El Salvador, donde cuatro estudiantes de Ingeniería en Sistemas Informáticos compartían el entusiasmo por la tecnología y la ambición de crear algo significativo. Estábamos inmersos en la materia de Diseño de Sistemas, y el desafío de desarrollar un proyecto integrador nos brindó la oportunidad perfecta para poner en práctica lo que habíamos aprendido y demostrar nuestra capacidad para innovar.</p>
                    <p>Las primeras reuniones eran pura efervescencia creativa. Debates sobre cómo abordar la gestión de proyectos, identificar las necesidades reales de los usuarios y diseñar una solución eficiente eran moneda corriente. A medida que avanzábamos, nos dimos cuenta de que nuestra visión conjunta estaba tomando forma, y así nació la idea de nuestro Sistema Gestor de Proyectos.</p>
                    <p>A lo largo de los meses, enfrentamos desafíos técnicos, noches de programación frenética y pruebas exhaustivas. Pero cada obstáculo fue una oportunidad para crecer y aprender. Nuestro compromiso y pasión nos llevaron a superar cualquier adversidad, y finalmente, llegamos al punto en el que estábamos listos para compartir nuestro producto con el mundo.</p>
                </div>
                <div className="parallax5"></div>
            </section>
        </>
    )
}

export default Index;