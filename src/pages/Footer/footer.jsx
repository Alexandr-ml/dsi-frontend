import React from "react";
import { useNavigate } from "react-router";
import { AppBar } from "@mui/material";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#f1f1f1",
    bottom: 0,    
  };
  let navigate = useNavigate()

  return (
    <AppBar position="sticky" className="text-center text-white" style={footerStyle}>
      
      <div
        className="text-center text-white p-3"
        style={{ backgroundColor: "#214A87"}}
      >
        © 2023 Copyright
        <p onClick={()=> navigate("/index")} style={{cursor:'pointer', textDecoration:'underline'}}>SISTEMA GESTOR DE PROYECTOS</p>        
      </div>
      
    </AppBar>
  );
}
