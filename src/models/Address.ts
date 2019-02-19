import * as mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
    country: String
});

export default addressSchema;
