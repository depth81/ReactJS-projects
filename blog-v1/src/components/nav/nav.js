import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Category from '../pages/Category';
import Contact from '../pages/Contact';
import PageNotFound from '../pages/PageNotFound';

export default function Nav(){
    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <Router>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Category">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Contact">Contact</Link>
                        </li>    
                    </ul>
                    <Switch>
                        <Route exact path='/Category' component={Category}/>
                        <Route exact path='/Contact' component={Contact}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </Router>
            </div>  
        </nav>
    );
}