import React, {Component, useState, useEffect} from 'react';

//Componente con clase
export default class Ejemplo extends Component{
    render (){
        return(
            <>
                <h1> hola jossy </h1>
            </>
        )
    }               
}

//Componente con funcion
export function Ejemplo2(props){
    const {datos, saludo} = props;
    console.log(datos, saludo);
    return(
        <>
            <button onClick={()=>saludo(datos.nombre)}> hola destructirm</button>
        </>
    )             
}

//Componente con funcion de flecha
export const Ejemplo3 = (props)=> {
    console.log(props);
    /*const saludar = ()=>{
        alert('hola agustin');
    }*/
    return(
        <>
            <h1> hola {props.datos.nombre} y tengo {props.datos.edad} años</h1>
            <button onClick={()=>props.saludo(props.datos.nombre)} > Saludar </button>
        </>
    )    
}

//con flecha
export const Ejemplo4 = (props)=> {
    const [stateSalir, serStateSalir] = useState(false);
    const [contar, setContar] = useState(0);
    //hook useEffect
    useEffect(()=>{
        console.log("total : "+ contar);
    }, [contar]);
    //hook useState
    const salirEntrar = ()=>{
        serStateSalir(!stateSalir);
        setContar(contar+1);
    };
  
  
    return(
        <>
            <h1> Voy a: {stateSalir ? "Salir" : "Entrar"}</h1>
            <h2>Clicks al boton: {contar}</h2>
            <button onClick={salirEntrar} > Salir / Entrar </button>
        </>
    )    
}
