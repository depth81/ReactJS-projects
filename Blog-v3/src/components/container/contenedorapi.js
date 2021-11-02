import React, {useState, useEffect} from 'react';
import Articulo from './articulos/articulo';




 const ContenedorApi = ()=>{

    
    const [post, setPost] = useState([]);

    const [pageNumber, setPageNumber] = useState(1);
    const [buttonnext, setbuttonnext] = useState(false);
    const [prebutton, setprebutton] = useState(true);
    //const PostsPerPage = 2;
    const limit=3;
    const [startIndex,setstartIndex] = useState();
    const [endIndex,setendIndex] = useState();

    const obtenerDatos = async () => {
        var url ='https://newsapi.org/v2/top-headlines?' +
        'country=co&' +
        'apiKey=661ad647db6d43e29c9c0c21ae9e0ac2';
        const res = await fetch(url);
        const not = await res.json();
        console.log(not.articles);
        setPost(not.articles);
        return not.articles;
       
   }


    /*useEffect (()=>{
        //datos();
        obtenerDatos();
        
    }, []);*/

    useEffect(()=>{
        setstartIndex((pageNumber-1)*limit)
        setendIndex(pageNumber*limit)
        console.log(startIndex)
        console.log(endIndex)
        obtenerDatos();
    
      },[ pageNumber, startIndex, endIndex])

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
                 <p>{ pageNumber}</p>
                 <button className="btn btn-primary" 
                    disabled={buttonnext} onClick={Next}
                > Cargar Más </button>
            </div>
        </div>
    );
}
export default ContenedorApi;