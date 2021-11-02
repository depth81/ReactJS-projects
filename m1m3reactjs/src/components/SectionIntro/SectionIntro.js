import React from "react";
import './SectionIntro.css'
import bird from './../../img/bird.jpg'

export const SectionIntro = () => {
    return(
        <div>
            <div className="container-fluid bg-1 text-center">
            <h3 className="margin">Who Am I?</h3>
            <img src={bird} className="img-responsive img-circle margin" style={{display:'inline'}} alt="Bird" width="350" height="350" />
            <h3>I'm an adventurer</h3>
            </div>

            <div className="container-fluid bg-2 text-center">
            <h3 className="margin">What Am I?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <a href="#/" className="btn btn-default btn-lg">
                <span className="glyphicon glyphicon-search"></span> Search
            </a>
            </div>
        </div>
        
    )
    
}