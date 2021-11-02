import React from 'react';
import Sidebar from './../sidebar/sidebar';
import ContenedorApi from '../container/contenedorapi';
import Pie from './../pie/pie';

export default function Inicio(){    
    const obtenerDatos = async () => {
        var url ='https://newsapi.org/v2/top-headlines?' +
        'country=co&' +
        'apiKey=661ad647db6d43e29c9c0c21ae9e0ac2';
        const res = await fetch(url);
        const not = await res.json();
        console.log(not.articles);
        /* setPost(not.articles); */
        return not.articles;
    }

    <ContenedorApi>
        obtenerDatos={this.obtenerDatos};
    </ContenedorApi>

    let fecha = new Date().getFullYear();
    return(
        <>
        {/* <Header titulo={obj.titulo} parrafo={obj.parrafo}/>
        <Nav/> */}
        <div className="container" style={{"marginTop" : "30px"}}>
            <div className="row">
                <Sidebar/>
                <ContenedorApi obtenerDatos={obtenerDatos} />
            </div>
        </div>
        <Pie fecha={fecha}/>
    </>
    );
}