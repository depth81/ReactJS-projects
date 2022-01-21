import express from "express";
import productController from '../Controllers/productController.js';
const productRoutes = express.Router();

//CRUD (Admin user only)
//Find
productRoutes.get('/findproduct', (req,res) => {
    res.json('GET request to the findproduct page');
});
productRoutes.post('/findproduct', async(req,res)=>{
    let findProd = await productController.findproduct(req.body);
    res.json(findProd);
});

productRoutes.get('/findallproducts',async(req,res) => {
    let allProducts = await productController.findallproducts(req.query);
    res.json(allProducts);
})

//Add
productRoutes.post('/addproduct', async(req,res)=>{
    let addProd = await productController.addproduct(req.body);
    res.json(addProd);
});

//Edit
productRoutes.put('/editproduct', async(req,res)=>{
    let editProd = await productController.editproduct(req.body);
    res.json(editProd);
});

//Delete
productRoutes.delete('/deleteproduct', async(req,res) => {
    let deleteProduct = await productController.deleteproduct(req.body);
    res.json(deleteProduct);
})

export default productRoutes;