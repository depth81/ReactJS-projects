import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import apiBaseUrl from '../../shared/utils/Api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    margin: '5vh auto 0 auto',
    height:'100vh'
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
    },
}));

const myStyles = {
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
    },
}
    

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:'#7E9B98',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Users = () => {

    const classes = useStyles();
    const [role, setRole] = useState('');
    
    const [users, setUsers] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const history = useHistory();
    const handleRouteEditUser = (targetemail) =>{
        history.push(`/edituser/${targetemail}`);
    }
    const handleRouteCreateUser = () => {
        history.push('/adduser')
    }

    useEffect(()=>{
        let email = JSON.parse(localStorage.getItem('email'));
        const userRole = JSON.parse(localStorage.getItem('role'));
        setRole(userRole);
        if(!email){
            history.push('/');
        }
    },[history])
        
    const findAllUsers = async () => {
        try{
            const response = await fetch(`${apiBaseUrl}/findallusers`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const users = await response.json();
            setUsers(users);
            setDataLoaded(true);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        if(dataLoaded) return
        findAllUsers();
        return () => {
            setDataLoaded(false);
        };
    },[])

    const deleteUser = async (email) => {
        try{
            var data = {
                'email': email
            }
            const response = await fetch(`${apiBaseUrl}/deleteuser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
                const targetUser = await response.json();
                if(targetUser){
                    toast.success("Succesfully deleted",{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose:2000
                    });
                    findAllUsers();
                }
        }catch(e){
            console.log(e);
        };
    };

    return (
        <div className={classes.root} style={myStyles.bckimg}>
            <Container className={classes.container} maxWidth="lg">
                <Router>
                    <Paper className={classes.paper}>
                        <Box display="flex" style={{marginBottom:30}}>
                            <Box flexGrow={1} >
                                <Typography component="h2" variant="h6" style={{color:"#7E9B98"}} gutterBottom>
                                    USERS
                                </Typography>
                            </Box>
                            <Box>
                                <Link to="/adduser" style={{textDecoration: 'none'}}>
                                    <Button variant="contained" style={{color:"#FFF", backgroundColor:"#7E9B98"}} onClick={handleRouteCreateUser}>
                                    CREATE
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>First Name</StyledTableCell>
                                        <StyledTableCell align="center">Last Name</StyledTableCell>
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                        <StyledTableCell align="center">Country</StyledTableCell>
                                        <StyledTableCell align="center">City</StyledTableCell>
                                        <StyledTableCell align="center">Role</StyledTableCell>
                                        <StyledTableCell align="center">Store</StyledTableCell>
                                        <StyledTableCell align="center">ACTION</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user,index) => {
                                        return(
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">{user.firstName}</StyledTableCell>
                                                <StyledTableCell align="center">{user.lastName}</StyledTableCell>
                                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                                <StyledTableCell align="center">{user.country}</StyledTableCell>
                                                <StyledTableCell align="center">{user.city}</StyledTableCell>
                                                <StyledTableCell align="center">{user.role}</StyledTableCell>
                                                <StyledTableCell align="center">{user.store}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <ButtonGroup color="primary" aria-label="outlined primary button group" align="center">
                                                        <Button color="primary" onClick={() => handleRouteEditUser(user.email)}>Edit</Button> 
                                                        <Button color="secondary" onClick={() => deleteUser(user.email)}>Delete</Button>
                                                    </ButtonGroup>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                                
                            </Table>
                        </TableContainer>
                    </Paper>
                </Router>
            </Container>
        </div>
    );
}

export default Users;