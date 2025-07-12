import { User } from "../models/userModels.js";
import { Order } from "../models/orderModels.js";

//making order for the frontend

const placeOrder = async (req,res)=>{
    try {
        const newOrder = new Order({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await User.findByIdAndUpdate(req.userId,{cartData:{}})
        const orderId = newOrder._id
        res.status(200).json({success:true,orderId})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Order failed"})
    }
}

//payment verify 
const verify = async (req,res)=>{
    const {orderId,success} = req.body;

    try {
        if(success==="true"){
            await Order.findByIdAndUpdate(orderId,{payment:true})
            res.status(200).json({success:true,message:"Paid"})
        }else{
            await Order.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false,message:"Problem in payment"})
    }
}


//getting order for the user
const userOrder = async (req,res)=>{
    try {
        const order = await Order.find({userId:req.userId})
        res.json({success:true,data:order})
       
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in getting order fot the user"})
    }
}


//getting all the order list for the admin

const orderList = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error in getting order list"})
    }
}


//updating order status

const updateStatus = async (req,res) => {
    const {orderId,status} = req.body;
    try {
        await Order.findByIdAndUpdate(orderId,{status:status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        res.json({success:false,message:"Failed to update status"})
    }
}



export {
    placeOrder,
    verify,
    userOrder,
    orderList,
    updateStatus
}