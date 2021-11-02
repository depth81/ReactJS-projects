import React from 'react';
import Contacto from '../pages/contacto';
import Countries from '../pages/countries';
import Category from '../pages/category';
import Inicio from '../pages/inicio';
import { NotFound } from '../pages/NotFound';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default function Nav(){
    return(
        <Router>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <Link className="navbar-brand" to="#/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li className='nav-item'><Link className='nav-link' to="/">INICIO</Link></li>
                            <li className='nav-item'><Link className='nav-link' to="/Countries">PAISES</Link></li>
                            <li className='nav-item'><Link className='nav-link' to="/Category">CATEGORIAS</Link></li>
                            <li className='nav-item'><Link className='nav-link' to="/Contacto">CONTACTO</Link></li>
                        </ul>
                    </div>
                </div>  
            </nav>
            <Switch>
                <Route exact path='/' component={Inicio} />
                <Route exact path='/Countries' component={Countries} />
                <Route exact path='/Category' component={Category} />
                <Route exact path='/Contacto' component={Contacto} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}