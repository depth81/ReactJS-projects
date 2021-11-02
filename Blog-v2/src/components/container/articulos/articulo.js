import React from 'react';
import "./articulos.css";

export default function Articulo( {url, titulo, contenido, imagen}){
    return(
        <>
            <h2>{titulo}</h2>
            <h5>12/09/21</h5>
            <div className="fakeimg">
                <img src={imagen} className="img-fluid" alt="imagen 1"/>
            </div>
            <a target="_blank" rel="noreferrer" href={url} className="btn btn-access">Ver Noticia</a>
            <p>{contenido}</p>
        </>
    );
}