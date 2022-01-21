import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
import apiBaseUrl from '../../shared/utils/Api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles(() => ({
    card: {
        height:'auto',
        width:1000,
        marginTop:'50px',
        marginBottom:'50px',
        margin:'auto',
        minWidth:275,
        overflow:'auto',
        backgroundColor:"#FBF5F5",
        borderRadius:10,
        padding:30,
    },
    pTag:{
        height:'30%',
    },
    bckimg: {
        backgroundImage: `url(${"https://cdn.pixabay.com/photo/2017/07/04/19/16/guitar-2472245_960_720.jpg"})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 8,
        display: 'flex',
        overflow: 'hidden',
        width:'auto',
        height:'100vh',
        margin:2,
        padding:20,
    },
    btnPrimary:{
        color:"FFF",
        backgroundColor:"#7E9B98",
    },
    texts:{
        color:"#7E9B98"
    },
}));

const Cart = () => {
    
    let myCart = JSON.parse(localStorage.getItem('savedItems'));
    const [items, setItems] = useState(myCart);
    let [total, setTotal] = useState(0);
    
    const history = useHistory();

    useEffect(()=>{
        let email = JSON.parse(localStorage.getItem('email'));
        if(!email){
            history.push('/');
        }
    },[history])
    
    useEffect(()=>{
        let acc = 0;
        if(!myCart){
            setTotal(0);
        }else{
            for(var i=0; i<myCart.length; i++){
                acc = acc + myCart[i].priceperunit;
                setTotal(acc+(acc*0.16));
            }
        }
    },[myCart]);

    const getSavedItems = () => {
        let myCart = JSON.parse(localStorage.getItem('savedItems'));
        setItems(myCart);
    };

    const removeAllItems = () => {
        localStorage.removeItem('savedItems');
        const aux = getSavedItems();
        if(!aux){
            setTotal(0);
        }
    };

    const addInvoice = async ()=> {
        let email = JSON.parse(localStorage.getItem('email'));
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        if(myCart){
            const invoiceData = [myCart,total,today,email];
            try{
                const response = await fetch(`${apiBaseUrl}/addinvoice`,{
                    method:'POST',
                    body:JSON.stringify(invoiceData),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const newInvoice = await response.json();
                toast.success("Product successfully added to your cart",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose:1000
                });
                console.log(newInvoice);
                getSavedItems();
            }catch(e){
                console.log(e);
            }
        }else{
            console.log("There was an error");
        }
    };

    const removeOneItem = (name) => {
        let myCart = JSON.parse(localStorage.getItem('savedItems'));
        let myCartUpdated = myCart.filter(el => el.name !== name);
        if(myCartUpdated.length===0){
            setTotal(0);
        }
        localStorage.setItem("savedItems", JSON.stringify(myCartUpdated));
        getSavedItems();
    };

    const classes = useStyles();

    return (
        <Box className={classes.bckimg}>
            <Box className={classes.card}>
                <Box style={{margin:'auto', width:'100%'}}>
                    <Typography variant="h4" style={{textAlign:'center', padding:20}} className={classes.texts}>
                    SHOPPING CART
                    </Typography>
                    <Box style={{}}>
                        {items && items.map((item,index)=>{
                            return(
                                <Box style={{display:'flex', paddingBottom:20}} key={index}>
                                    <Box sx={{height:'auto', bgcolor: 'background.paper'}}>
                                        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <img src={item.picture} alt="NoImage" style={{maxHeight:250}} />
                                            <Box sx={{padding:2}}><b>DESCRIPTION: </b> {item.description}</Box> 
                                            <Box sx={{padding:2}}><b>PRICE: </b>{item.priceperunit}</Box>
                                            <Button size="small" variant='contained' sx={{padding:1,margin:2, backgroundColor:'#F3B0B0'}} onClick={()=> removeOneItem(item.name)} >Remove</Button>
                                        </Box>
                                    </Box>
                                </Box>
                                )
                            })
                        };
                    </Box>
                    <Typography variant="h4" style={{paddingTop:25, paddingBottom:25}} className={classes.texts}>TOTAL($): {total}</Typography>
                    <Button variant="contained" size="large" onClick={removeAllItems} style={{margin:5}}>CLEAR</Button>
                    <Button type='submit' variant="contained" size="large" color="success" onClick={addInvoice} style={{margin:5}}>PAY</Button>
                </Box>
            </Box>
        </Box>
    )
};//END Cart

export default Cart
