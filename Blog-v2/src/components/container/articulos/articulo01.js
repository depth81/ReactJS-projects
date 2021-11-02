import React from 'react';
import "./articulos.css";

export default function Article01( {contenido, fecha, titulo}){
    
    return(
        <>
            <h2>{titulo}</h2>
            <h5>{fecha}</h5>
            <div className="fakeimg">Fake Image</div>
            <p>Some text..</p>
            <p>{contenido}</p>
        </>
    );
}