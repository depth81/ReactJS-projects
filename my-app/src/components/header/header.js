import React from 'react';

export const Header = ({title,description}) =>{
    return (
        <div className="jumbotron text-center" style={{"marginBottom":20}}>
            <h1>{title}</h1>
            <p>{description}</p> 
        </div>
    ); 
}