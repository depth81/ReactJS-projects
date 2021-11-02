import React from 'react';
import Sidebar from './../sidebar/sidebar';
import ContenedorApi from '../container/contenedorapi';
import Pie from './../pie/pie';

export default function Inicio(){
    let obj ={
        titulo:"My First Bootstrap 4 Page",
        parrafo:"Resize this responsive page to see the effect!"
      }
    
      let fecha = new Date().getFullYear();
    return(
        <>
            <div className="container" style={{"marginTop" : "30px"}}>
                <div className="row">
                    <Sidebar/>
                    <ContenedorApi/>
                </div>
            </div>
            <Pie fecha={fecha}/>
        </>
    );
}