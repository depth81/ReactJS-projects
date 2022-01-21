import User from '../Models/userModel.js';
import schema from '../passwordSchema.js';
import validator from 'email-validator';

const login = async (userData) => {
    
    const {email, password} = userData;

    try{
        if(email && password){
            const userDataFetched = await User.findOne({email:email,password:password});
            if(userDataFetched){
                    console.log(userDataFetched);
                    delete userDataFetched.password;
                    const user = {
                        firstName: userDataFetched.firstName,
                        lastName: userDataFetched.lastName,
                        email: userDataFetched.email,
                        role: userDataFetched.role,
                        country: userDataFetched.country,
                        city: userDataFetched.city,
                        store: userDataFetched.store
                    }
                return user;
            }
            else{
                return {message: 'The combination email and password typed does not exist in our records'} 
            }
        }
        else{
            return {message: "All the fields are required"};
        };
    }catch(e){
        return {message: "There was a problem: " + e};
    }

};

const finduser = async(userData)=>{

    const {email} = userData;

    try{
        if(email){
            let findUser = await User.find({email:email});
            if(findUser.length > 0){
                return(findUser);
            }else{
                return {message: "The email address does not exist in our records"}
            }
        }else{
            return {message: "The email address is required"};
        }
    }catch(e){
        return {message: "There was a problem: " + e};
    }

};

const findallusers = async() => {
    
    try{
        const allUsers = await User.find({});
        return(allUsers);
    }catch(e){
        return {message: "There was a problem: " + e};
    }
    
}

const deleteuser = async(userData)=>{

    const {email} = userData;

    try{
        if(email){
            const delUser = await User.deleteOne({email:email});
            if(delUser.deletedCount>0){
                return {message: "The user has been deleted"};
            }else{
                return {message:"the email address does not exist"}
            }     
        }else{
            return {message: "The email address is required"};
        }
    }catch(e){
        return {message: "There was a problem: " + e};
    }

};

const adduser = async(userData)=>{

    const {firstName, lastName, email, password, role, country, city, store} = userData;

    try{
        if(firstName && lastName && email && password && role && country && city && store){
            if(validator.validate(email)){
                if(schema.validate(password)){
                    const newUser = new User({
                        firstName: firstName,
                        lastName:lastName,
                        email: email,
                        password:password,
                        role:role,
                        country:country,
                        city:city,
                        store:store
                    });
                    const aNewUser = await newUser.save();
                    return {message: "Successfully saved! " + aNewUser.firstName + " " + aNewUser.lastName };
                }else{
                    return {message:"The password must be longer than 8 characters, besides, it must include at least one uppercase and a special character"};
                }
            }else{
                return {message: "Please check your email address syntax"}
            }  
        }else{
            return {message:"All the fields are required"}
        }    
    }catch(e){
        return {message: "There was a problem: " + e};
    };
};

const edituser = async(userData)=>{

    const {firstName, lastName, email, password, role, country, city, store} = userData;
    
    try{
        if(firstName && lastName && email && password && role && country && city && store){
            if(validator.validate(email)){
                if(schema.validate(password)){
                    const editedUser = await User.findOneAndUpdate({email:email},{firstName:firstName,lastName:lastName,password:password,role:role,country:country,city:city,store:store});
                    return(editedUser);
                }else{
                    return {message:'The password must be longer than 8 characters, besides, it must include at least one uppercase and a special character'}
                }
            }else{
                return {message: 'please enter a valid email address'}
            }
        }else{
            return {message:"All the fields are required"}
        }     
    }catch(e){
        return {message: "There was a problem: " + e};
    };

};


const userController = {
    login,
    finduser,
    findallusers,
    deleteuser,
    adduser,
    edituser
}
export default userController;