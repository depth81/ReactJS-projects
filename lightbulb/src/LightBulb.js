import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import bombillo1 from './img/bombillo1.png';
import bombillo2 from './img/bombillo2.png';

const LightBulb = () => {

    const [toggled, setToggled] = useState(false);
    const [times, setTimes] = useState(0);
    const [image, setImage] = useState(bombillo1);

    const clear = () => {
        setImage(bombillo1);
        setTimes(0);
    }

    const handleEvent = () => {
        if(toggled){
            setImage(bombillo1)
        }else{
            setImage(bombillo2)
            setTimes(times+1); 
        }
        setToggled(!toggled);
    }
    
    return (
    <Fragment>
        <div style={{}}>
            <img src={image} alt="NoImage" />
        </div>
        <div>
            <button  onClick={handleEvent}>ON/OFF</button>
            <button  onClick={clear}>RESET</button>
            <p>{times}</p>
        </div>
    </Fragment>
    )
}

export default LightBulb
