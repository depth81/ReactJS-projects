import React, {useState} from 'react';
import imagen from './../../imagenes/birds2.jpg';

export default function Sidebar(){

    const {categoria, setCategoria} = useState('General');

    const cambiarCategoria = e => {
        console.log(e.target.value);
        setCategoria(e.target.value);
    }

    return(
        <div className="col-sm-4">
            <h2>About Me</h2>
            <h5>Photo of me:</h5>
            <div className="fakeimg">
            <img src={imagen} className="img-fluid" alt="imagen 1"/>
            </div>
            <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
            <h3>Some Links</h3>
            <p>Lorem ipsum dolor sit ame.</p>
                <form>
                    <div className="form-group">
                        <select className="form-control" onChange={cambiarCategoria}>
                            <label>Seleccione categoria</label>
                                <option value="business">Business</option>
                                <option value="sports">Sports</option>
                                <option value="health">Health</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                                <option value="science">Science</option>
                        </select>
                    </div>
                </form>
            <hr className="d-sm-none"/>
        </div>
    );
}