import React, {useState, useEffect} from 'react';
import Articulo from './articulos/articulo';

const ContenedorApi = (obtenerDatos)=>{
    console.log(obtenerDatos);
    const [post, setPost] = useState([]);

    const [pageNumber, setPageNumber] = useState(1);
    const [buttonnext, setbuttonnext] = useState(false);
    const [prebutton, setprebutton] = useState(true);
    //const PostsPerPage = 2;
    const limit=3;
    const [startIndex,setstartIndex] = useState();
    const [endIndex,setendIndex] = useState();

  
    useEffect(()=>{
        setstartIndex((pageNumber-1)*limit)
        setendIndex(pageNumber*limit)
        console.log(startIndex)
        console.log(endIndex)
        setPost(obtenerDatos);
      },[ pageNumber, startIndex, endIndex, obtenerDatos])

      const Next = ()=>{
        if(pageNumber === (Math.floor((obtenerDatos.length + limit -1)/limit))){
          setbuttonnext(true)
        }else{
          setPageNumber(pageNumber+1)
          setprebutton(false)
        }
      }
      const Previous = () =>{
        if(pageNumber === 1){
          setprebutton(true)
        }else{
          setPageNumber(pageNumber-1)
          setbuttonnext(false)
        }
      }

    return(
        <div className="col-sm-8">
              {
                post.slice(startIndex, endIndex).map((posts, index)=>(
                    <Articulo
                        key={index}
                        url={posts.url}
                        titulo={posts.title}
                        contenido={posts.description}
                        imagen={posts.urlToImage}
                    />
                )) 
              }
            <div className="text-center">
                <button className="btn btn-primary" 
                    disabled={prebutton}  onClick={Previous}
                > Cargar menos </button>
                |<p>{ pageNumber}</p>
                |<button className="btn btn-primary" 
                    disabled={buttonnext} onClick={Next}
                > Cargar Más </button>
            </div>
        </div>
    );
}
export default ContenedorApi;