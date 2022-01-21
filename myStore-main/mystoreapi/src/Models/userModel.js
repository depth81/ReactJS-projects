import mongoose from 'mongoose';
const UserSchema = mongoose.Schema;

const UserModel = new UserSchema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true },
    role: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    store: { type: String, required: false },
});

const User = mongoose.model('user', UserModel);
export default User;