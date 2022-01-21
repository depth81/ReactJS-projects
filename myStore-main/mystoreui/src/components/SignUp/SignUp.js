import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import apiBaseUrl from '../../shared/utils/Api';
import {useHistory} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles(() => ({
	root: {
		marginTop: 50,
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'column',
        backgroundColor:'#ECF6F5',
        borderRadius:'30px',
        paddingTop:'30px',
        paddingLeft:'25px',
        paddingRight:'25px',
        paddingBottom:'50px',
        marginBottom:'40px',

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
	}
}));

const myStyles = {
    btnPrimary:{
        color:"FFF",
        backgroundColor:"#7E9B98",
    },
    texts:{
        color:"#7E9B98",
    },
    bckimg: {
        backgroundImage: `url(${"https://cdn.pixabay.com/photo/2017/07/04/19/16/guitar-2472245_960_720.jpg"})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 8,
        display: 'flex',
        marginLeft: '5px',
        marginRight:'5px',
        marginTop: '10px',
        marginBottom:'10px',
        overflow: 'hidden',
        height:'90vh',
    },
    boxForm:{
        backgroundColor:'white'
    }
}

const SignUp = ({styles}) => {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [store, setStore] = useState('');
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state);

    const classes = useStyles();

    const history = useHistory();
    const handleRoute = () =>{
        history.push('/');
    }

    const addUser = async () => {

        if(firstName && lastName && email && password && role && country && city && store){

            const userData = {
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                role:role,
                country:country,
                city:city,
                store:store
            }
            try{
                const response = await fetch(`${apiBaseUrl}/adduser`,{
                    method:'POST',
                    body:JSON.stringify(userData),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const newUser = await response.json()
                toast.success("Successfully registered",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose:2000
                });
                console.log(newUser);
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
    };

    const options = ['User', 'Admin'];

    return (
        <Box style={myStyles.bckimg}>
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box className={classes.root}>
                <Typography component="h1" variant="h5" style={myStyles.texts}>
                Sign up
                </Typography>
                <Box noValidate sx={{ mt: 3 }} style={myStyles.boxForm}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={(e)=>setFirstName(e.target.value)} value={firstName}
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={(e)=>setLastName(e.target.value)} value={lastName}
                        autoComplete="lname"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)} value={email}
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e)=>setPassword(e.target.value)} value={password}
                        autoComplete="new-password"
                    />
                    </Grid>   
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        onChange={(e)=>setCountry(e.target.value)} value={country}
                        autoComplete="country"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        onChange={(e)=>setCity(e.target.value)} value={city}
                        autoComplete="city"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {/* <TextField
                        required
                        fullWidth
                        id="role"
                        label="Role"
                        name="role"
                        onChange={(e)=>setRole(e.target.value)} value={role}
                        autoComplete="role"
                    /> */}
                    <Autocomplete 
                        disablePortal
                        fullWidth
                        id="combo-box-demo"
                        options={options}
                        getOptionLabel={option => option}
                        onChange={(event, value) =>setRole(value)}
                        renderInput={(params) => <TextField {...params} label="Role" />}
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
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={addUser}
                    style={myStyles.btnPrimary}
                >
                    Sign Up
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleRoute}
                    style={myStyles.btnPrimary}
                >
                    Go Back
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link href="/" variant="body2" style={myStyles.texts}>
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Container>
        </Box>
    );
};

export default SignUp;