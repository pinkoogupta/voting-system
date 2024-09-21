import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema =new Schema(
    {
        name:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true
        },
        email:{
            type:String,
        },
        mobile:{
            type:String
        },
        address:{
            type:String,
            required:true
        },
        aadharcard:{
            type:Number,
            required:true,
            unique:true
        },
        password:{
            type:String,
            rquired:true
        },
        role:{
            type:String,
            enum:['voter','admin'],
            default:'voter'
        },
        isvoted:{
            type:Boolean,
            default:fales
        }
},
    {
    timestapms:true
});
const User=mongoose.model('User',userSchema);
export User;
