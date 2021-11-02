import React from 'react';
import "./articulos.css";

export default function Articulo( {titulo, contenido, imagen}){
    console.log({titulo, contenido});
    //const {contenido, fecha, titulo} = articulo;
    return(
        <>
            <h2>{titulo}</h2>
            <h5>12/90/21</h5>
            <div className="fakeimg">
                <img src={imagen} className="img-fluid" alt="imagen 1"/>
            </div>
            <p>Some text..</p>
            <p>{contenido}</p>
        </>
    );
}