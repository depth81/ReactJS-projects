import React, {useState, useEffect} from 'react';
import Article01 from './articulos/articulo01';

export default function Contenedor(){
    //primero se pasa la variable y despues la funcion que modifica el estado de la variable
    const [articulos, setArticulos] = useState([]);
    const [indexStart, setIndexStart] = useState();
    const [endStart, setEndStart] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [btnNext, setBtnNext] = useState(false);
    const [btnPrev, setBtnPrev] = useState(true);

    const pageLimit = 3;

    const getData = async () => {
        const url = 'https://newsapi.org/v2/everything?q=tesla&from=2021-09-12&sortBy=publishedAt&apiKey=25b4cac3640249c2ad53cca0a1ec5686';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.articles);
        /* console.log(data.totalResults);
        console.log(data.status); */
        setArticulos(data.articles);
    }

    useEffect(()=>{
        setIndexStart((pageNumber-1)*pageLimit);
        setEndStart(pageNumber*pageLimit);
        getData();
    },[pageNumber,indexStart,endStart])

    const Next = () => {
        if(pageNumber === (Math.floor(getData().length+pageLimit-1)/pageLimit)){
            setBtnNext(true);
        }else{
            setBtnPrev(false);
            setPageNumber(pageNumber+1);
        }
    }

    const Prev = () => {
        if(pageNumber===1){
            setBtnPrev(true);
        }else{
            setBtnNext(false);
            setPageNumber(pageNumber-1)    
        }
    }

    return(
        <div className="col-sm-8">
            {
                articulos.slice(indexStart,endStart).map((articulo,index)=>(
                    <Article01
                        key={index}
                        title={articulo.title}
                        img={articulo.urlToImage}
                        content={articulo.description}
                    />) 
                )
            }
            <div className="text-center">
                <button className="btn btn-primary" disabled={btnNext} onClick={Next}>Cargar mas</button>
                <p>{pageNumber}</p>
            </div>
            <div className="text-center">
                <button className="btn btn-secondary" disabled={btnPrev} onClick={Prev}>Cargar menos</button>
            </div>

        </div>
    );
}