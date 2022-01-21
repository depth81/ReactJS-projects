import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup } from '@mui/material';
import {useHistory } from "react-router-dom";
import apiBaseUrl from '../../shared/utils/Api';
import Box from '@mui/material/Box';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function ProductCard({name, description, picture, priceperunit, qtyavailable, store, role}) {
    const history = useHistory();
    const handleRouteEditProduct = (targetproduct) =>{
        history.push(`/editproduct/${targetproduct}`);
    }

    const deleteProduct = async (name) => { 
        try{
            var data = {
                'name': name
            }
            const response = await fetch(`${apiBaseUrl}/deleteproduct`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                }) 
                const result = window.confirm( "Do you want to do this?" );
                if(result){
                    if(result){
                        await response.json();
                        toast.success("Successfully deleted",{
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose:2000
                        });
                        window.location.reload();
                    }else{
                        return
                    }
                }
        }catch(e){
            console.log(e);
        }
    };
    
    const addItemToCart = (name,description,picture,priceperunit) => {
        let newItem = {name:name, description:description, picture:picture, priceperunit:priceperunit};
        let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        let data = [newItem, ...savedItems];
        localStorage.setItem('savedItems', JSON.stringify(data));
        toast.success("Added to your Cart!",{
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose:2000
        });
    }

    return (
        <Box style={{
            display:'flex',
            height:'auto',
            width:'auto',
            marginTop:'50px',
            marginBottom:'50px',
            minWidth:275,
            overflow:'auto',
            borderRadius:10,
            padding:30,
        }}>
        <Card sx={{height:'auto', maxWidth: 400, margin:1, padding:1}}>
            <CardContent style={{height:'auto'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {priceperunit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Quantity: {qtyavailable}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Store: {store}
                </Typography>
                <CardMedia
                    component="img"
                    height="400px"
                    image={picture}
                    alt="noImg"
                />
            </CardContent>
            <CardActions>
                <ButtonGroup color="primary" aria-label="outlined primary button group" align="center" >
                    <Button size="small" onClick={() => addItemToCart(name,description,picture,priceperunit)} >Add To Your Cart</Button>
                    {role === 'Admin' ? <Button color="primary" size="small" onClick={() => handleRouteEditProduct(name)}>Edit</Button> : null};
                    {role === 'Admin' ? <Button color="secondary" size="small" onClick={() => deleteProduct(name)}>Delete</Button> : null};
                </ButtonGroup>
            </CardActions>
        </Card>
        </Box>
    );
}

