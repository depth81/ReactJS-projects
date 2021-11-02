import React from 'react';
import Contacto from '../pages/contacto';
import Countries from '../pages/countries';
import Category from '../pages/category';
import Inicio from '../pages/inicio';
import NotFound from '../pages/notFound';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';


export default function Nav(){
    return(
        <Router>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <Link className="navbar-brand" to="/index">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/index" activeClassName="active">INICIO</NavLink>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Category">CATEGORIAS</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Countries">PAISES</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Contacto">CONTACTO</Link>
                            </li>
                        </ul>
                </div>  
            </nav>
            <Switch>
                <Route path="/Contacto" component={Contacto} />
                <Route path="/countries" component={Countries} />
                <Route path="/category" component={Category} />
                <Route path="/index" component={Inicio} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}