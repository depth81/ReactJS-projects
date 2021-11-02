import React from 'react';

export default function Header({titulo, parrafo}){
    return(
        <div className="jumbotron text-center" style={{"marginBottom":0}}>
            <h1>{titulo}</h1>
            <p>{parrafo}</p> 
        </div>
    );
}