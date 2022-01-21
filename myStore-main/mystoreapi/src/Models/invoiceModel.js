import mongoose from 'mongoose';
const InvoiceSchema = mongoose.Schema;

/* const InvoiceModel = new InvoiceSchema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    picture:{type:String, required:true},
    priceperunit:{type:Number, required:true},
    email:{type:String, required:true},
    total:{type:Number, required:true},
    date:{type:String, required:true},
}); */

const InvoiceModel = new InvoiceSchema({
    invoice:{ type : Array , default : []},
});

const Invoice = mongoose.model('invoice', InvoiceModel);
export default Invoice;