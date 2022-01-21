import express from 'express';
import userController from '../Controllers/userController.js';
const userRoutes = express.Router();

//Home
userRoutes.get('/', async(req,res)=>{
    const data = "HELLO WORLD";
    res.json(data);
});

//LOGIN
userRoutes.get('/login', (req,res) => {
    res.json('GET request to the login page');
});
userRoutes.post('/login', async(req,res)=>{
    let data = await userController.login(req.body);
    res.json(data);
});


//Admin's functions on users.
userRoutes.route('/finduser').get(async(req,res)=>{
    res.json('GET request to the findusers page');
}).post(async(req,res)=>{
    let findUser = await userController.finduser(req.body);
    res.json(findUser);
});

userRoutes.route('/findallusers').get(async(req,res)=>{
    let findAllUsers = await userController.findallusers(req.query);
    res.json(findAllUsers);
})

userRoutes.route('/deleteuser').delete(async(req,res)=>{
    let deleteUser = await userController.deleteuser(req.body);
    res.json(deleteUser);
})

userRoutes.route('/adduser').post(async(req,res)=>{
    let addUser = await userController.adduser(req.body);
    res.json(addUser);
});

userRoutes.route('/edituser').put(async(req,res)=>{
    let editUser = await userController.edituser(req.body);
    res.json(editUser);
})


export default userRoutes;