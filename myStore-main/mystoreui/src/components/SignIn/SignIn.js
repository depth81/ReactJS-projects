import  React, {useState} from 'react';
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
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const myStyles = {
    btnPrimary:{
        color:"FFF",
        backgroundColor:"#7E9B98",
    },
    texts:{
        color:"#7E9B98"
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
        marginBottom:'5px',
        overflow: 'hidden',
        width:'auto',
        height:'100vh',
    }
}

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
    }
});

const SignIn = () => {

    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const historyOne = useHistory();
    const historyTwo = useHistory();

    const handleRouteLoginSuccess = () =>{
        localStorage.setItem('state', JSON.stringify(true));
        localStorage.setItem('email', JSON.stringify(email));
        historyOne.push('/products');
    }
    const handleRouteLoginFailed = () =>{
        historyTwo.push('/');
    }

    const login = async () => {
        if(email && password){
            const userData = {
                email:email,
                password:password
            }
            try{
                const response = await fetch(`${apiBaseUrl}/login`,{
                    method:'POST',
                    body:JSON.stringify(userData),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const user = await response.json();                
                localStorage.setItem('role', JSON.stringify(user.role));

                if(user.message === "The combination email and password typed does not exist in our records" || user.message === "All the fields are required"){
                    toast.error("Wrong credentials",{
                        position: toast.POSITION.BOTTOM_LEFT,
                        autoClose:2000
                    });
                    handleRouteLoginFailed();
                    setEmail('');
                    setPassword('');
                }
                else{
                    toast.success("Successfully logged in",{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose:1000
                    });
                    handleRouteLoginSuccess();
                }
            }catch(e){
                console.log(e);
            }
        }else{
            toast.error("Wrong credentials",{
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:2000
            });
        };
    };

    return (
        <div style={myStyles.bckimg}>
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 10,
                display: 'flex',
                justifyContent:'center',
                flexDirection: 'column',
                alignItems: 'center',
                height:'50%',
                backgroundColor:'#ECF6F5',
                borderRadius:'30px',
                padding:'30px',
                paddingBottom:'40px',
            }}
            >
                <Typography component="h1" variant="h5" style={myStyles.texts}>
                    Sign in
                </Typography>
                <Box noValidate sx={{ mt: 1 }} style={{marginTop:'10px'}}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e)=>setEmail(e.target.value)} value={email}
                    autoFocus
                    className={classes.root}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)} value={password}
                    autoComplete="current-password"
                    className={classes.root}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={login}
                    sx={{ mt: 3, mb: 2}}
                    style={myStyles.btnPrimary}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2" style={myStyles.texts}>
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/adduser" variant="body2" style={myStyles.texts}>
                        "Don't have an account? Sign Up"
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        </div>
    );
}

export default SignIn
