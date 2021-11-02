import React, {useState} from 'react';
import Article01 from './articulos/articulo01';

export default function Contenedor(){
    //primero se pasa la variable y despues la funcion que modifica el estado de la variable
    const [articulos, setArticulos] = useState([
        {id:0, titulo:"TITLE HEADING 1", fecha:"Title description, Dec 7, 2017", contenido:"Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
        {id:1, titulo:"TITLE HEADING 2", fecha:"Title description, Dec 8, 2018", contenido:"Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ]);

    return(
        <div className="col-sm-8">
            {
                articulos.map(articulo =>(
                    <Article01
                        key={articulo.id}
                        titulo={articulo.titulo}
                        fecha={articulo.fecha}
                        contenido={articulo.contenido}
                    />
                ))
            }
            .<div class="text-center">
                <button class="btn btn-primary" 
                    onClick={ ()=>{ setArticulos([
                        {id:2, titulo:"TITLE HEADING 3", fecha:"Title description, Dec 7, 2016", contenido:"Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                        {id:3, titulo:"TITLE HEADING 4", fecha:"Title description, Dec 8, 2015", contenido:"Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
                    ]) } }
                > Cargar mas </button>
            </div>
        </div>
    );
}