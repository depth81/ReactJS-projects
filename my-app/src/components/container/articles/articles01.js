import React from "react";
import "./articles.css";

export const Article01= ({id, title, date,  description}) =>{

    return (
        <>
            <h2>ARTICLE {id}</h2>
            <h5>{date}</h5>
            <div className="fakeimg">Fake Image</div>
            <p>{title}</p>
            <p>{description}.</p>
        </>
        
    ); 
}