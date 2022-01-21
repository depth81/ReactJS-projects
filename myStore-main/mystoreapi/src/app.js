import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import invoiceRoutes from './Routes/invoiceRoutes.js';

const app = express();
const port = 3001;
const uri = 'mongodb://localhost:27017/StoreDB';
const db = mongoose;

app.use(express.json());
app.use(cors({origin:true}));
//routes
app.use(userRoutes);
app.use(productRoutes);
app.use(invoiceRoutes);


app.listen(port,async()=>{
    try{
        await db.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(mongoose.connection.readyState === 1 ? "Connected to DB" : "Not connected");
    }catch{
        console.log("Error de conexión a la BD");
    }
    console.log(`This is our store listening at http://localhost:${port}`);
})
