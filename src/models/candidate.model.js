import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const candidateSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true;
        },
        party:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        votes:[
            {
                user:{
                    type:mongoose.Schema.TYpes.ObjectId,
                    ref:'User',
                    rquired:true
                },
                votedAt:{
                    type:Date,
                    default:Date.now()
                }
            }
        ],
        voteCount:{
            type:Number,
            default:0
        }

    },
{
timestapms:true;
});  

export const Candidate=mongoose.model('Candidate',candidateSchema);