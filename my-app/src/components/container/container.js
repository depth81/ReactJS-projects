import React, { useState } from "react";
import { Article01 } from "./articles/articles01";

export const Container = () => {
        
    //Primero se pasa la variable y después la función que modifica el valor de esa variabla
    const [articles, setArticles] = useState([
        {id:1,title:"FIRST TITLE",date:"2021-09-21",description:"These are my new song and my new book"},
        {id:2,title:"SECOND TITLE",date:"2021-09-20",description:"These are my new house and my new car"},
        {id:3,title:"THIRD TITLE",date:"2021-09-19",description:"These are new guitar and my new drums"},
    ]);

    return(
        <>
            <div className="col-sm-8">
                {
                    articles.map((article)=>{
                        return <>
                            <Article01
                                key={article.id}
                                title={article.title}
                                date={article.date}
                                description={article.description}
                            />
                        </>
                    })
                }
                <div className='text-center'>
                    <button 
                        className='btn btn-primary'
                        onClick={()=>setArticles([
                            {id:4,title:"FOURTH TITLE",date:"2021-09-28",description:"These are my new toy and my new tree"},
                            {id:5,title:"FIFTH TITLE",date:"2021-09-27",description:"These are my new train and my new plane"},
                            {id:6,title:"SIXTH TITLE",date:"2021-09-26",description:"These are my new console and my new stereo"},
                        ])}>
                            CLICK ME!
                    </button>
                    <button 
                        className='btn btn-primary'
                        onClick={()=>setArticles([
                            {id:1,title:"FIRST TITLE",date:"2021-09-21",description:"These are my new song and my new book"},
                            {id:2,title:"SECOND TITLE",date:"2021-09-20",description:"These are my new house and my new car"},
                            {id:3,title:"THIRD TITLE",date:"2021-09-19",description:"These are new guitar and my new drums"},
                        ])}>
                            ROLLBACK!
                    </button>
                </div>
            </div>
        </>
    )
}