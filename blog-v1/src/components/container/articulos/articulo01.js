import React from 'react';
import "./articulos.css";

export default function Article01({content, title, img}){
    return(
        <>
            <h2>{title}</h2>
            <div>
                <img src={img} alt='NoImage' style={{'width':'500px'}}/>
            </div>
            <p>{content}</p>
        </>
    );
}