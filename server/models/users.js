import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

let User = mongoose.model('User', UserSchema);

export default User
