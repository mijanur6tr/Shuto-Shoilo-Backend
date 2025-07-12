import mongoose , {Schema} from "mongoose";


const productSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
},{timeseries:true})


export const ProductModel = mongoose.model("ProductModel",productSchema)