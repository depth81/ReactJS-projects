import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import apiBaseUrl from '../../shared/utils/Api';
import TextField from '@mui/material/TextField';

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
    btnPrimary:{
        color:"FFF",
        backgroundColor:"#D3DEC2",
        height:54,
        marginLeft:20
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


const Invoice = () => {

    const classes = useStyles();

    let [bills, setBills] = useState([]);
    let [filteredBills, setFilteredBills] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [email, setEmail] = useState('');
    let role = JSON.parse(localStorage.getItem('role'));
    console.log(role);

    const history = useHistory();

    useEffect(()=>{
        let email = JSON.parse(localStorage.getItem('email'));
        if(!email){
            history.push('/');
        }
    },[history])
    
    const findAllInvoices = async () => {
        try{
            const response = await fetch(`${apiBaseUrl}/findallinvoices`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const theBills = await response.json();
            setBills(theBills);
            console.log(theBills);
            setDataLoaded(true);
            let email = JSON.parse(localStorage.getItem('email'));
            let filteredBills = theBills.filter(el=>el.invoice.at(-1)===email) || [];
            setFilteredBills(filteredBills);
            console.log(filteredBills);
        }catch(e){
            console.log(e);
        }
    };
    
    useEffect(() => {
        if(dataLoaded) return
        findAllInvoices();
        return () => {
            setDataLoaded(false);
        };
    },[]);

    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("email");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                } else {    
                tr[i].style.display = "none";
                }
            } 
        }
    };

    return (
        <div className={classes.root} style={myStyles.bckimg}>
            <Container className={classes.container} maxWidth="lg" style={{overflow:'auto', marginBottom:20}}>
                <Router>
                    <Paper className={classes.paper}>
                        <Box display="flex" style={{marginBottom:30}}>
                            <Box flexGrow={1} >
                                <Typography component="h2" variant="h6" style={{color:"#7E9B98"}} gutterBottom>
                                    INVOICES
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                        {role==='Admin' ?
                        <TextField
                            margin="normal"
                            required
                            name="searchemail"
                            label="Search Email..."
                            type="email"
                            id="email"
                            onChange={(e)=>setEmail(e.target.value)} value={email}
                            onKeyUp={myFunction}
                            autoComplete="email"
                            style={{width:'100%', marginTop:0}}
                        />
                        : 
                        null}
                        </Box>
                        {role==='Admin' ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table" id='myTable'>
                                <TableHead>
                                    <TableRow id='tr'>
                                        <StyledTableCell>Invoice#</StyledTableCell>
                                        <StyledTableCell align="center">User</StyledTableCell>
                                        <StyledTableCell align="center">Details</StyledTableCell>
                                        <StyledTableCell align="center">Price ($)</StyledTableCell>
                                        <StyledTableCell align="center">Qty</StyledTableCell>
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center">Total (+16%)</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bills && bills.map((bill,index) => {
                                        return(
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice.at(-1)}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice[0].map((el)=>{
                                                    return(
                                                        <ul style={{textAlign:'left'}}>
                                                            <li style={{listStyleType:'none'}}>
                                                                {el.name}
                                                            </li>
                                                        </ul>
                                                    );
                                                    
                                                })}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice[0].map((el)=>{
                                                    return(
                                                        <ul style={{textAlign:'left'}}>
                                                            <li style={{listStyleType:'none'}}>
                                                                {el.priceperunit}
                                                            </li>
                                                        </ul>
                                                    );
                                                    
                                                })}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice[0].length}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice.at(-2)}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice.at(-3)}</StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : 
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table" id='myTable'>
                                <TableHead>
                                    <TableRow id='tr'>
                                        <StyledTableCell>Invoice#</StyledTableCell>
                                        <StyledTableCell align="center">User</StyledTableCell>
                                        <StyledTableCell align="center">Details</StyledTableCell>
                                        <StyledTableCell align="center">Price ($)</StyledTableCell>
                                        <StyledTableCell align="center">Qty</StyledTableCell>
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center">Total (+16%)</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredBills && filteredBills.map((bill,index) => {
                                        return(
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice.at(-1)}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice[0].map((el)=>{
                                                    return(
                                                        <ul style={{textAlign:'left'}}>
                                                            <li style={{listStyleType:'none'}}>
                                                                {el.name}
                                                            </li>
                                                        </ul>
                                                    );
                                                    
                                                })}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice[0].map((el)=>{
                                                    return(
                                                        <ul style={{textAlign:'left'}}>
                                                            <li style={{listStyleType:'none'}}>
                                                                {el.priceperunit}
                                                            </li>
                                                        </ul>
                                                    );
                                                    
                                                })}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice[0].length}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice.at(-2)}</StyledTableCell>
                                                <StyledTableCell align="center">{bill.invoice.at(-3)}</StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                </Paper>
                </Router>
            </Container>
        </div>
    );
}

export default Invoice;