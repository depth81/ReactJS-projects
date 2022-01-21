import mongoose from 'mongoose';
const ProductSchema = mongoose.Schema;

const ProductModel = new ProductSchema({
    name: {type: String, required:true},
    description: {type:String, required:true},
    picture:{type:String, required:true},
    priceperunit:{type:Number, required:true},
    qtyavailable:{type:Number, required:true},
    store:{type:String}
});

const Product = mongoose.model('product', ProductModel);
export default Product;