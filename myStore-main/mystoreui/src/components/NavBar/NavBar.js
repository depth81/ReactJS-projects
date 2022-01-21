import * as React from "react";
import { AppBar, Toolbar, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from './../../logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles(() => ({
	root: {
		boxShadow: "none",
		backgroundColor: "#ccc",
		width:'100%',
	},
	logo: {
		maxWidth: 100,
		marginRight: '10px',
		flexGrow:1,
	},
	myLinks: {
		color:"#295954",
		display:'flex',
	}
}));

const NavBar = () => {
	
	const classes = useStyles();
	const logout = () => {
		localStorage.clear();
	};

	const handleClickLogin = (e) => {
		const state = JSON.parse(localStorage.getItem('state'));
		console.log(state);
		if(state){
			e.preventDefault();
			toast.error("Resource not available: You are already logged in",{
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:2000
            });
		}
	};

	const handleClickRegister = (e) => {
		const state = JSON.parse(localStorage.getItem('state'));
		console.log(state);
		if(state){
			e.preventDefault();
			toast.error("Resource not available: You are already registered",{
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:2000
            });
		}
	};

	const handleClickUsers = (e) => {
		const role = JSON.parse(localStorage.getItem('role'));
		console.log(role);
		if(role==='User'){
			e.preventDefault();
			toast.error("Resource not available: You dont have enough permissions",{
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:2000
            });
		}
	};


	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
			<img src={logo} alt="logo" className={classes.logo} />
			<Box
				sx={{
				display: "flex",
				flexDirection: "row-reverse",
				alignContent: "center",
				typography: "body1",
				gap: 2,
				p:2,
				fontSize: "15px",
				width: "100%",
				marginRight:8,
				}}
			>
				<Link color="inherit" onClick={logout} component={RouterLink} to="/" className={classes.myLinks}>
				Logout
				</Link>
				<Link color="inherit" component={RouterLink} to="/" className={classes.myLinks} onClick={handleClickLogin}>
				Login
				</Link> 
				<Link color="inherit" component={RouterLink} to="/adduser" className={classes.myLinks} onClick={handleClickRegister}>
				Register
				</Link>
				<Link color="inherit" component={RouterLink} to="/users" className={classes.myLinks} onClick={handleClickUsers}>
				Users
				</Link>
				<Link color="inherit" component={RouterLink} to="/products" className={classes.myLinks}>
				Products
				</Link>
				<Link color="inherit" component={RouterLink} to="/invoice" className={classes.myLinks}>
				Invoices
				</Link>
				<Link color="inherit" component={RouterLink} to="/cart">
					<ShoppingCartIcon />
				</Link>
				<AccountCircle />
			</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;