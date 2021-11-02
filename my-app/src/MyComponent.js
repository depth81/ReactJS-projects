import React, {Component, useState} from "react";

export default class MyComponent extends Component{
    render(){
        return(
            <h1> Component using a class </h1>
        )
    }
};


export function SegundoComponente({nombre, apellido,saludo}){
    return(
        <>
            <h1>This is my name {nombre} {apellido}</h1>
            <button onClick={()=>saludo(nombre, apellido)}> Saludar </button>
        </>
    )
};


export const TercerComponente = ({profesion}) => {  
    const [stateSalirEntrar, setStateSalirEntrar] = useState(true);
    console.log(stateSalirEntrar);
    return(
        <>
            <h1>This is my profession: {profesion}</h1>
            <h2>Voy a: {stateSalirEntrar ? "Salir":"Entrar"} </h2>
            <button onClick={()=>{
                setStateSalirEntrar(!stateSalirEntrar);
            }}>{stateSalirEntrar ? "Salir":"Entrar"}</button>
        </> 
    )
};