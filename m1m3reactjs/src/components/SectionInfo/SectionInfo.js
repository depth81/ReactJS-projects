import React from "react";
import { useState } from "react";
import './SectionInfo.css'
import birds0 from './../../img/birds1.jpg';
import birds1 from './../../img/birds2.jpg';
import birds2 from './../../img/birds3.jpg';

let imgBirds = [birds0,birds1,birds2];

export const SectionInfo = () => {

    const [birds, setBirds] =  useState([
        {id:0,description:"this is the first description",src:{birds0}},
        {id:1,description:"this is the second description",src:{birds1}},
        {id:2,description:"this is the third description",src:{birds2}},
    ])

    
    return(
        <div className="container-fluid bg-3 text-center">    
            <h3 className="margin">Where To Find Me?</h3><br/>
            <div className="row">            
                {
                    birds.map((bird, index)=>{
                        return(
                            <div key={index} className="col-sm-4">
                                <p>{bird.description}</p>   
                                <img src={imgBirds[bird.id]} className="img-responsive margin" style={{width:'100%'}} alt="NoImage" />    
                            </div>
                        
                        ) 
                    })
                }
            </div>
            <div className='text-center'>
                    <button 
                        className='btn btn-primary'
                        onClick={()=>setBirds([
                            {id:2,description:"First text changed"},
                            {id:0,description:"Second text changed"},
                            {id:1,description:"Thord text changed"},
                        ])}>
                            CLICK ME!
                    </button>
                    <button 
                        className='btn btn-primary'
                        onClick={()=>setBirds([
                            {id:0,description:"this is the FIRST change"},
                            {id:1,description:"this is the SECOND change"},
                            {id:2,description:"this is the THIRD change"},
                        ])}>
                            ROLLBACK!
                    </button>
                </div>
        </div>
    )
}
