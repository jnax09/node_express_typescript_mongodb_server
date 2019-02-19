import * as mongoose from 'mongoose';
import User from '../interfaces/UserInterface';
import addressSchema from './Address';

const userSchema = new mongoose.Schema({
    address: addressSchema,
    email: String,
    name: String,
    password: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
