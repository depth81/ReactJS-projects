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
    btn:{
        
    }
});

const EditUser = () => {

    const classes = useStyles();

    const {targetemail} = useParams();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [store, setStore] = useState('');

    const history = useHistory();
    const handleRoute = () =>{
        history.push('/users');
    }

    useEffect(()=>{
        const loadUser = async () => {
            if(targetemail){
                const userData = {
                    email:targetemail
                }
                try{
                    const response = await fetch(`${apiBaseUrl}/finduser`,{
                        method:'POST',
                        body:JSON.stringify(userData),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    });
                    const targetUser = await response.json();
                    const [targetUser2] = targetUser;
                    const {firstName, lastName, email, password, role, country, city, store} = targetUser2;
                    
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmail(email);
                    setPassword(password);
                    setRole(role);
                    setCountry(country);
                    setCity(city);
                    setStore(store);
    
                }catch(e){
                    console.log(e);
                }
            }else{
                toast.error("A valid email address is required to get any user from our DB",{
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose:2000
                });
            }
        }
        loadUser();
    },[targetemail])

    const editingUser = async () => {
        
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
                const response = await fetch(`${apiBaseUrl}/edituser`,{
                    method:'PUT',
                    body:JSON.stringify(userData),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const editedUser = await response.json();
                toast.success("Successfully edited",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose:2000
                });
                console.log(editedUser);
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
        <ThemeProvider theme={theme}>
            <Box className={classes.bckimg}>  
            <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    display:'flex',
                    alignContent:'flex-start',
                    flexWrap:'wrap',
                    justifyContent:'space-evenly',
                    typography: 'body1',
                    width:'100%',
                    height:'auto',
                    marginTop:5,
                    backgroundColor:'#FFF',
                    padding:10,
                    borderRadius:10,
                }}
            >
                <Typography component="h1" variant="h5" style={{color:"#7E9B98", marginBottom:30}}>
                Edit user data
                </Typography>
                <Box noValidate sx={{ }}>
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
                        className={classes.root}
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
                        className={classes.root}
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
                        className={classes.root}
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
                        className={classes.root}
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
                        className={classes.root}
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
                        className={classes.root}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="role"
                        label="Role"
                        name="role"
                        onChange={(e)=>setRole(e.target.value)} value={role}
                        autoComplete="role"
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
                    onClick={editingUser}
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
                    To Users
                </Button>
                </Box>
            </Box>
            </Container>
            </Box>
        </ThemeProvider>
    );
};

export default EditUser
