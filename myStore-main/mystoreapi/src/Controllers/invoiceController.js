import Invoice from "../Models/invoiceModel.js";

const findinvoice = async(data)=>{
    const {email} = data;
    try{
        if(email){
            let findInvoice = await Invoice.find({email:email});
            console.log(findInvoice);
            if(findInvoice.length>0){
                return(findInvoice);
            }else{
                return {message: "You do not have invoices yet"};
            }
            
        }else{
            return {message: "At least the user email is required"};
        }
    }catch(e){
        return {error: "There was a problem finding the invoice: " + e};
    }

};

const findallinvoices = async() => {
    try{
        const allInvoices = await Invoice.find({});
        return(allInvoices);
    }catch(e){
        return {message: "There was a problem: " + e};
    }
    
};

const addinvoice = async(invoiceData)=>{
    
    /* const {name, description, picture, priceperunit, email, total, date} = invoiceData; */
    console.log(invoiceData);

    try{
        if(invoiceData){
            const newInvoice = new Invoice({
                invoice:invoiceData,
            });
            console.log(newInvoice);
            const aNewInvoice = await newInvoice.save();
            console.log(aNewInvoice);
            return(aNewInvoice);
    
        }else{
            return {message:"We could not add that invoice"};
        };
    }catch(e){
        return {error: "There was an error adding the invoice: " + e};
    }

};

const invoiceController = {
    findinvoice,
    findallinvoices,
    addinvoice,
};

export default invoiceController;