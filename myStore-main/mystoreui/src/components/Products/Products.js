import React, {useEffect,useState} from 'react';
import {Link, useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';
import apiBaseUrl from '../../shared/utils/Api';
import ProductCard from '../ProductCard/ProductCard';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '5px',
        height:'100vh',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height:'auto',
        marginBottom:20,
    },
    bckimg: {
        backgroundImage: `url(${"https://cdn.pixabay.com/photo/2017/07/04/19/16/guitar-2472245_960_720.jpg"})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 8,
        marginLeft: '5px',
        marginRight:'5px',
        marginTop: '10px',
        marginBottom:'10px',
        overflow: 'auto',
        height:'100vh',
    },
}));

export const Products = () => {

    const userRole = JSON.parse(localStorage.getItem('role'));
    /* localStorage.setItem('state', JSON.stringify(true)); */

    const classes = useStyles();

    const history = useHistory();
    const handleRouteCreateProduct = () => {
        history.push('/addproduct')
    }

    const [products, setProducts] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [role, setRole] = useState(userRole);

    const findAllProducts = async () => {
        try{
            const response = await fetch(`${apiBaseUrl}/findallproducts`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const products = await response.json();
            setProducts(products);
            setDataLoaded(true);
        }catch(e){
            console.log(e);
        }
    };

    useEffect(()=>{
        let email = JSON.parse(localStorage.getItem('email'));
        if(!email){
            history.push('/');
        }
    },[history])

    useEffect(() => {
        if(dataLoaded) return
        findAllProducts();
        return () => {
            setDataLoaded(false);
        };
    },[]);

    useEffect(() => {
        setRole(userRole);
        return () => {
            setDataLoaded(false);
        };
    },[]);

    return (
        <Box className={classes.root}>
            <Box className={classes.bckimg}>
            <Container className={classes.container} maxWidth="lg">
                <Paper className={classes.paper}>
                    <Box display="flex" style={{marginBottom:0}}>
                            <Box flexGrow={1}>
                                <Typography component="h2" variant="h6" style={{color:"#7E9B98"}} gutterBottom>
                                    PRODUCTS
                                </Typography>
                            </Box>
                            <Box>
                                {role==='Admin'?<Link to="/addproduct" style={{textDecoration: 'none'}}>
                                    <Button variant="contained" style={{color:"#FFF", backgroundColor:"#7E9B98"}} onClick={handleRouteCreateProduct}>
                                    CREATE
                                    </Button>
                                </Link>:null}
                            </Box>
                        </Box>
                    <Box sx={{
                        display:'flex',
                        justifyContent:'space-evenly',
                        flexWrap:'wrap',
                        typography: 'body1',
                        width:'100%',
                        marginBottom:'5vh',
                        marginTop:'5vh',
                    }}>
                    {products.map((product,index)=>{
                        return(
                            <ProductCard key={index} name={product.name} description={product.description} picture={product.picture} priceperunit={product.priceperunit} qtyavailable={product.qtyavailable} store={product.store} role={role}/>
                        )
                    })}
                    </Box>
                </Paper>
            </Container>
            </Box>
        </Box>
    
    )
}

export default Products;
