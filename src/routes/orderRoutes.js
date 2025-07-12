import express from "express"
import { placeOrder,verify,userOrder,orderList,updateStatus } from "../controllers/orderControllers.js"
import { authMiddleware } from "../middlewares/authMiddlewares.js"
import { verifyAdmin } from '../middlewares/vrfyAd.Middlewares.js';


const orderRouter = express.Router()

orderRouter.post("/place-order",authMiddleware,placeOrder)
orderRouter.post("/verify",authMiddleware,verify)
orderRouter.post("/get-order",authMiddleware,userOrder)
orderRouter.get("/list",verifyAdmin,orderList)
orderRouter.post("/status",verifyAdmin,updateStatus)

export {orderRouter}
