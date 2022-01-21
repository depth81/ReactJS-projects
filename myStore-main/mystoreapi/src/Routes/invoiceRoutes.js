import express from "express";
import invoiceController from "../Controllers/invoiceController.js";
const invoiceRoutes = express.Router();

invoiceRoutes.post('/findinvoice', async(req,res) => {
    let findInvoice = await invoiceController.findinvoice(req.body);
    res.json(findInvoice);
});

invoiceRoutes.get('/findallinvoices',async(req,res) => {
    let allInvoices = await invoiceController.findallinvoices(req.query);
    res.json(allInvoices);
});

//Add
invoiceRoutes.post('/addinvoice', async(req,res)=>{
    let addInvoice = await invoiceController.addinvoice(req.body);
    res.json(addInvoice);
});

export default invoiceRoutes;