import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import EditUser from './components/EditUser/EditUser';
import Users from './components/Users/Users';
import Products from './components/Products/Products';
import EditProduct from './components/EditProduct/EditProduct';
import AddProduct from './components/AddProduct/AddProduct';
import Footer from './components/Footer/Footer.js';
import Cart from './components/Cart/Cart.js';
import Invoice from './components/Invoice/Invoice.js';

const App = () => {
  return (
    <>
      <Router>
      <NavBar />
        <Switch>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Route path='/adduser' exact>
            <SignUp />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/edituser/:targetemail" exact>
            <EditUser />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/addproduct" exact>
            <AddProduct />
          </Route>
          <Route path="/editproduct/:targetproduct" exact>
            <EditProduct />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/invoice" exact>
            <Invoice />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;