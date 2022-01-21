import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiBaseUrl from '../../shared/utils/Api';
import {useParams} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const theme = createTheme();

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "green"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "purple"
        },
        "& .MuiOutlinedInput-input": {
        color: "green"
        },
        "&:hover .MuiOutlinedInput-input": {
        color: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "purple"
        },
        "& .MuiInputLabel-outlined": {
        color: "green"
        },
        "&:hover .MuiInputLabel-outlined": {
        color: "red"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
        color: "purple"
        }
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
        overflow: 'hidden',
        height:'100vh',
    },
});

const EditProduct = () => {

    const classes = useStyles();

    const {targetproduct} = useParams();
    
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [priceperunit, setPricePerUnit] = useState('');
    const [qtyavailable, setQtyAvailable] = useState('');
    const [store, setStore] = useState('');

    const history = useHistory();

    const handleRoute = () =>{
        history.push('/products');
    }
    
    useEffect(()=>{
        const loadProduct = async () => {
            if(targetproduct){
                const productData = {
                    name:targetproduct
                }
                try{
                    const response = await fetch(`${apiBaseUrl}/findproduct`,{
                        method:'POST',
                        body:JSON.stringify(productData),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    });
                    
                    const targetproduct = await response.json();
                    const [targeProduct2] = targetproduct;
                    const {name, description, picture, priceperunit, qtyavailable, store} = targeProduct2;
                    
                    setName(name);
                    setDescription(description);
                    setPicture(picture);
                    setPricePerUnit(priceperunit);
                    setQtyAvailable(qtyavailable);
                    setStore(store);
    
                }catch(e){
                    console.log(e);
                }
            }else{
                toast.error("A valid product name is required to get any product from our DB",{
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose:2000
                });
            }
        }
        loadProduct();
    },[targetproduct])

    const editingProduct = async () => {

        if(name && description && picture && priceperunit>=0 && qtyavailable>=0 && store){
            const productData = {
                name:name,
                description:description,
                picture:picture,
                priceperunit:priceperunit,
                qtyavailable:qtyavailable,
                store:store
            }
            try{
                const response = await fetch(`${apiBaseUrl}/editproduct`,{
                    method:'PUT',
                    body:JSON.stringify(productData),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const editedProduct = await response.json();
                toast.success("Successfully edited",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose:2000
                });
                console.log(editedProduct);
                handleRoute();
            }catch(e){
                console.log(e);
            }
        }else{
            toast.error("All the fields are required",{
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:2000
            });
        }
    }
    
    return (
        <>     
        <ThemeProvider theme={theme}>
        <Box className={classes.bckimg}>  
            <Container component="main"  sx={{
                    display:'flex',
                    alignContent:'flex-start',
                    flexWrap:'wrap',
                    justifyContent:'space-evenly',
                    typography: 'body1',
                    width:'90%',
                    height:'auto',
                    marginTop:5,
                    backgroundColor:'#FFF',
                    padding:10,
                    maxWidth:1000,
                    borderRadius:10,
                }}>
            <CssBaseline />
                <Typography component="h1" variant="h5" style={{color:"#7E9B98", marginBottom:30}}>
                Edit product
                </Typography>
                <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            autoComplete="name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            onChange={(e)=>setName(e.target.value)} value={name}
                            autoFocus
                            className={classes.root}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            onChange={(e)=>setDescription(e.target.value)} value={description}
                            autoComplete="description"
                            className={classes.root}
                            multiline
                            maxRows={2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="picture"
                        label="URL picture"
                        name="picture"
                        onChange={(e)=>setPicture(e.target.value)} value={picture}
                        autoComplete="picture"
                        className={classes.root}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="price"
                        label="Price"
                        id="price"
                        onChange={(e)=>setPricePerUnit(e.target.value)} value={priceperunit}
                        autoComplete="new-password"
                        className={classes.root}
                    />
                    </Grid>   
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="qtyavailable"
                        label="Quantity"
                        name="country"
                        onChange={(e)=>setQtyAvailable(e.target.value)} value={qtyavailable}
                        autoComplete="country"
                        className={classes.root}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="store"
                        label="Store"
                        name="store"
                        onChange={(e)=>setStore(e.target.value)} value={store}
                        autoComplete="store"
                        className={classes.root}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={editingProduct}
                    style={{color:"#FFF", backgroundColor:"#7E9B98"}}
                >
                    Save changes
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleRoute}
                    style={{color:"#FFF", backgroundColor:"#7E9B98"}}
                >
                    To Products
                </Button>
                </Box>
            </Container>
            </Box>
        </ThemeProvider>
        </>
        
    );
};

export default EditProduct
