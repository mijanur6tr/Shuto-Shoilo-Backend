import mongoose ,{Schema} from 'mongoose'

const orderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Product Processing"
    },
    payment:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Order = mongoose.model("Order",orderSchema)