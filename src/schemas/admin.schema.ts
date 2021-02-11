import * as mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({
   
    "username" : String,
    "password" :  String,
    "mobile" : String,
    "email" : String,
    "status" : String,
    "role_id" : String,
    "create_time" : String,
    "is_super" : String
})