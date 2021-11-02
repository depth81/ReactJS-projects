import React from "react";

export const Footer = ({year}) =>{
    return(
        <div className="jumbotron text-center" style={{"marginBottom":"0"}}>
            <p>TODOS LOS DERECHOS RESERVADOS {year}</p>
        </div>
    );
};