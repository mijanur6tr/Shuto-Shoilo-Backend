import express from "express"
import { authMiddleware } from "../middlewares/authMiddlewares.js"
import { addToCart,removeFromCart,getCart } from "../controllers/cartControllers.js"


const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.get("/get-cart",authMiddleware,getCart)


export {cartRouter}